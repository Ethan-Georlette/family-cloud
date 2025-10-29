const express = require('express');
const multer = require('multer');
const Minio = require('minio');
const cors = require('cors');

/**
 * /home/ethan/family-cloud/backend/server.js
 *
 * Minimal Express REST API that talks to a local MinIO container.
 *
 * Environment variables:
 *   PORT (default 3000)
 *   MINIO_ENDPOINT (default "minio")
 *   MINIO_PORT (default 9000)
 *   MINIO_USE_SSL (true/false, default false)
 *   MINIO_ACCESS_KEY
 *   MINIO_SECRET_KEY
 *   BUCKET_NAME (default "family-cloud")
 *
 * Example docker-compose (outside this file):
 *   services:
 *     minio:
 *       image: minio/minio
 *       command: server /data
 *       environment:
 *         MINIO_ROOT_USER: minioadmin
 *         MINIO_ROOT_PASSWORD: minioadmin
 *       ports: ["9000:9000"]
 *     api:
 *       build: .
 *       environment:
 *         MINIO_ENDPOINT: minio
 *         MINIO_PORT: 9000
 *         MINIO_ACCESS_KEY: minioadmin
 *         MINIO_SECRET_KEY: minioadmin
 *       depends_on: ["minio"]
 */


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const BUCKET = process.env.BUCKET_NAME || 'family-cloud';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'minio',
    port: parseInt(process.env.MINIO_PORT || '9000', 10),
    useSSL: (process.env.MINIO_USE_SSL === 'true'),
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

// Ensure bucket exists (create if missing)
async function ensureBucket(bucketName) {
    try {
        const exists = await minioClient.bucketExists(bucketName);
        if (!exists) {
            await minioClient.makeBucket(bucketName, '');
            console.log(`Bucket "${bucketName}" created`);
        } else {
            console.log(`Bucket "${bucketName}" exists`);
        }
    } catch (err) {
        console.error('Error ensuring bucket:', err);
        throw err;
    }
}

// Multer memory storage (keeps file in RAM; OK for small files)
const upload = multer({ storage: multer.memoryStorage() });

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Create bucket
app.post('/bucket', async (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).json({ error: 'name required' });
    try {
        const exists = await minioClient.bucketExists(name);
        if (!exists) await minioClient.makeBucket(name, '');
        return res.json({ bucket: name, created: !exists });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || err });
    }
});

// Upload file (form field: file)
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'file required' });
    const filename = req.body.name || req.file.originalname;
    const objectName = `${Date.now()}_${filename}`;

    try {
        await minioClient.putObject(BUCKET, objectName, req.file.buffer, {
            'Content-Type': req.file.mimetype || 'application/octet-stream',
        });
        return res.status(201).json({ bucket: BUCKET, object: objectName });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || err });
    }
});

// List objects (optional prefix ?prefix=)
app.get('/objects', async (req, res) => {
    const prefix = req.query.prefix || '';
    const objects = [];
    const stream = minioClient.listObjectsV2(BUCKET, prefix, true);
    stream.on('data', obj => objects.push(obj));
    stream.on('error', err => {
        console.error(err);
        return res.status(500).json({ error: err.message || err });
    });
    stream.on('end', () => res.json({ bucket: BUCKET, objects }));
});

// Download object
app.get('/object/:name', async (req, res) => {
    const name = req.params.name;
    try {
        // Get metadata if available to set content-type
        let meta;
        try { meta = await minioClient.statObject(BUCKET, name); } catch (e) { meta = null; }
        const stream = await minioClient.getObject(BUCKET, name);
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(name)}"`);
        if (meta && meta['content-type']) res.setHeader('Content-Type', meta['content-type']);
        stream.pipe(res);
        stream.on('error', err => {
            console.error(err);
            if (!res.headersSent) res.status(500).json({ error: err.message || err });
        });
    } catch (err) {
        console.error(err);
        return res.status(404).json({ error: 'object not found', details: err.message || err });
    }
});

// Delete object
app.delete('/object/:name', async (req, res) => {
    const name = req.params.name;
    try {
        await minioClient.removeObject(BUCKET, name);
        return res.json({ deleted: name });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || err });
    }
});

// Startup
(async () => {
    try {
        await ensureBucket(BUCKET);
        app.listen(PORT, () => {
            console.log(`API listening on http://0.0.0.0:${PORT} -> MinIO ${minioClient.protocol || (process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http')}://${minioClient.host}:${minioClient.port}/${BUCKET}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();