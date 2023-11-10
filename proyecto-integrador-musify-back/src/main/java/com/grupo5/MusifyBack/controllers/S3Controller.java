package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.services.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1")
public class S3Controller {

    @Autowired
    private IS3Service s3Service;

//@PostMapping("/uploadfiles")
//    public String uploadFile(@RequestParam("file")MultipartFile files) throws Exception {
//        return s3Service.uploadFiles(files);
//    }
//    @PostMapping("/uploadfiles")
//    public String uploadFiles(@RequestParam("file")MultipartFile[] files) throws Exception {
//        return s3Service.uploadFiles(files);
//    }


}
