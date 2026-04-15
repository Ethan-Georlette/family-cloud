import { useState } from "react";
import { uploadFile } from "../api/auth";

function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Choose a file first");
            return;
        }

        try {
            const res = await uploadFile(selectedFile);
            setMessage(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Upload failed");
        }
    };

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
}

export default UploadPage;