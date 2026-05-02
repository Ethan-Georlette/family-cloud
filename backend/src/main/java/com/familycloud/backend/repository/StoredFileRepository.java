package com.familycloud.backend.repository;
import com.familycloud.backend.model.StoredFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface StoredFileRepository extends JpaRepository<StoredFile, Long> {

    List<StoredFile> findByUploadedBy(String uploadedBy);
    StoredFile findByStoredFileName(String storedFileName);
}
