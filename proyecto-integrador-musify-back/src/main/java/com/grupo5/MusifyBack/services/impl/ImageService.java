package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.models.Images;
import com.grupo5.MusifyBack.services.IImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    private ImageService imageRepository;

    @Override
    public List<Images> getAllImages() {
        return imageRepository.getAllImages();
    }
}