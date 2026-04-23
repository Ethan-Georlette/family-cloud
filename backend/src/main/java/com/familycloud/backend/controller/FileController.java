package com.familycloud.backend.controller;

import java.util.List;
import java.util.ArrayList;
import com.familycloud.backend.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {
        try {
            String username = authentication.getName();
            String fileName = fileStorageService.uploadFile(file, username);
            return ResponseEntity.ok("Uploaded: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }

    // @GetMapping("/all")
    // public ResponseEntity<?> listFiles(Authentication authentication) {
    //     String username = authentication.getName();
    //     return ResponseEntity.ok(fileStorageService.listFilesForUser(username));
    // }

    @GetMapping("/preview")
    public ResponseEntity<String> getPreviewUrl(Authentication authentication) {
        List <String> names = fileStorageService.listFilesNames(authentication.getName());
        List<String> urls = new ArrayList<>();

        try {
            for(String name:names){
            String url = fileStorageService.getPreviewUrl(name);
            urls.add(url);
            }
            return ResponseEntity.ok(urls.get(0));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Failed to generate preview URL");
        }
    }
}
