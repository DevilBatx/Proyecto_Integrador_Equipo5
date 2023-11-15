package com.grupo5.MusifyBack.services;

import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;

public interface IS3Service {
    public List<String> uploadFiles(MultipartFile[] files, String s3Folder) throws IOException;
    public Boolean deleteFiles(List<String> fileUrls, String s3Folder) throws IOException;
}
