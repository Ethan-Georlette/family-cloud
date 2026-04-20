package com.familycloud.backend.service;

import java.util.UUID;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final MinioClient minioClient;
    private final FileMetadataService fileMetadataService;

    @Value("${minio.bucket}")
    private String bucketName;

    public FileStorageService(MinioClient minioClient, FileMetadataService fileMetadataService) {
        this.minioClient = minioClient;
        this.fileMetadataService = fileMetadataService;
    }

    public String uploadFile(MultipartFile file, String username ) throws Exception {
        String storedFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(storedFileName)
                        .stream(file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build()
        );
        fileMetadataService.saveFileMetadata(
                file.getOriginalFilename(),
                storedFileName,
                file.getContentType(),
                file.getSize(),
                username 
        );

        return storedFileName;
    }
}
