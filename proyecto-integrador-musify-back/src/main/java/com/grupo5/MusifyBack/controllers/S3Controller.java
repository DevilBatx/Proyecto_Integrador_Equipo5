package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.services.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class S3Controller {

    @Autowired
    private IS3Service s3Service;

@PostMapping("/uploadfile")
    public String uploadFile(@RequestParam("file")MultipartFile file) throws Exception {
        return s3Service.uploadFile(file);
    }
//    @PostMapping("/uploadfiles")
//    public String uploadFiles(@RequestParam("file")MultipartFile[] files) throws Exception {
//        return s3Service.uploadFiles(files);
//    }

}
