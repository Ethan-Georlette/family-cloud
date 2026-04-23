package com.familycloud.backend.service;

import com.familycloud.backend.model.StoredFile;
import com.familycloud.backend.repository.StoredFileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FileMetadataService {

    private final StoredFileRepository storedFileRepository;

    public FileMetadataService(StoredFileRepository storedFileRepository) {
        this.storedFileRepository = storedFileRepository;
    }

    public StoredFile saveFileMetadata(
            String originalFileName,
            String storedFileName,
            String contentType,
            Long size,
            String uploadedBy
    ) {
        StoredFile file = new StoredFile();
        file.setOriginalFileName(originalFileName);
        file.setStoredFileName(storedFileName);
        file.setContentType(contentType);
        file.setSize(size);
        file.setUploadedBy(uploadedBy);
        file.setUploadedAt(LocalDateTime.now());

        return storedFileRepository.save(file);
    }
    public Object getFilesForUser(String username) {
        return storedFileRepository.findByUploadedBy(username).s;
    }
}
