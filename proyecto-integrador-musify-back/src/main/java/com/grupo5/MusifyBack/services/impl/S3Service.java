package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.controllers.exceptions.ProductNotFoundException;
import com.grupo5.MusifyBack.services.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service implements IS3Service {

    private final S3Client s3Client; // Cliente de S3
    private String s3BucketName = "c12grupo5img";

    @Autowired
    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }


    //metodo para subir uno o varios archivos a S3
    public List<String> uploadFiles(MultipartFile[] files, Long productId) throws IOException {
        try {
            //String s3BucketName = "c12grupo5img";
            List<String> uploadedUrls = new ArrayList<>();
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String fileExtension = StringUtils.getFilenameExtension(originalFileName);
                String fileName = productId + "/" + UUID.randomUUID().toString() + "." + fileExtension;

                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                        .bucket(s3BucketName) // Nombre del bucket
                        .key(fileName) // Nombre del archivo
                        .build();

                s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes())); // Subir el archivo
                // Obtener la URL de la imagen subida
                String imageUrl = s3Client.utilities().getUrl(builder -> builder.bucket(s3BucketName).key(fileName)).toExternalForm();
                uploadedUrls.add(imageUrl);
            }
            return uploadedUrls;
        } catch (S3Exception e) {
            throw new IOException(e.getMessage());
        }
    }

    public Boolean deleteFiles(List<String> fileUrls, Long id) throws IOException {
        try {
            for (String fileUrl : fileUrls) {
                // Obtener el nombre del archivo (key)
                String fileName = id + "/" + fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
                //Buscar si existe el archivo en S3
                if (!doesFileExist(fileName)) {
                    throw new ProductNotFoundException("El archivo " + fileName + " no existe en S3");
                } else {
                    s3Client.deleteObject(builder -> builder.bucket(s3BucketName).key(fileName));
                }
            }
            return true;
        } catch (S3Exception e) {
            throw new IOException(e.getMessage());

        }
    }

    private boolean doesFileExist(String key) {
        try {
            s3Client.headObject(builder -> builder.bucket(s3BucketName).key(key));
            return true;
        } catch (S3Exception e) {
            if (e.statusCode() == 404)
                return false;
            else
                return false;
        }
    }

}
