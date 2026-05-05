package com.familycloud.backend.service;

import java.util.UUID;
import java.util.List;
import java.util.ArrayList;
import com.familycloud.backend.model.StoredFile;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.http.Method;
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


    public String getPreviewUrl(String storedFileName) throws Exception {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .method(Method.GET)
                        .bucket(bucketName)
                        .object(storedFileName)
                        .expiry(60 * 60) // 1 hour
                        .build()
        );
    }

    public String listFilesNames(String username){
        List<StoredFile> files = fileMetadataService.getFilesForUser(username);
        String names="[";
        for(StoredFile file:files){
            String storedName = file.getStoredFileName();
            try{
                names=names+"{\"storedName\":\""+storedName+"\", \"name\":\""+file.getOriginalFileName()+"\", \"url\":\""+getPreviewUrl(storedName)+"\", \"contentType\":\""+file.getContentType()+"\"},";
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        names=names.substring(0,names.length()-1)+"]";
        return names;
    }
    public void deleteFile(String storedFileName) throws Exception {
        System.out.println("Deleting file: " + storedFileName);
        minioClient.removeObject(
                io.minio.RemoveObjectArgs.builder()
                        .bucket(bucketName)
                        .object(storedFileName)
                        .build()
        );
        fileMetadataService.deleteFileMetadata(storedFileName);
    }
}
