package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.models.Image;
import com.grupo5.MusifyBack.services.IImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    private ImageService imageRepository;

    @Override
    public List<Image> getAllImages() {
        return imageRepository.getAllImages();
    }
}
