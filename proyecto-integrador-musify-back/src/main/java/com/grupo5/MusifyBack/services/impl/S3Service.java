package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.services.IS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service implements IS3Service {

    private final S3Client s3Client; // Cliente de S3

    @Autowired
    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    // Metodo para subir un archivo a S3
    public String uploadFile(MultipartFile file) throws IOException {
        try {
            String fileName = file.getOriginalFilename();
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket("c12grupo5img") // Nombre del bucket
                    .key(fileName) // Nombre del archivo
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes())); // Subir el archivo

            return "Archivo subido Correctamente";
        } catch (IOException e) {
            throw new IOException(e.getMessage());
        }
    }

    //metodo para subir uno o varios archivos a S3
    public List<String> uploadFiles(MultipartFile[] files, Long productId) throws IOException {
        try {
            String s3BucketName = "c12grupo5img";
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
        } catch (IOException e) {
            throw new IOException(e.getMessage());
        }
    }


}
