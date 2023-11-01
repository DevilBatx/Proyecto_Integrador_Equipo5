package com.grupo5.MusifyBack.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IS3Service {
    public String uploadFile(MultipartFile file) throws IOException;
    public List<String> uploadFiles(MultipartFile[] files, Long productId) throws IOException;
}
