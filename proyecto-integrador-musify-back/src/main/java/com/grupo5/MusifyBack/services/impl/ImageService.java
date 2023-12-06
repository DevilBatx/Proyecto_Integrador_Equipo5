package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.models.Image;
import com.grupo5.MusifyBack.services.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ImageService implements IImageService {
    @Autowired
    private ImageService imageRepository;

    @Override
    public List<Image> getAllImages() {
        return imageRepository.getAllImages();
    }

    @Override
    public Set<Image> getImagesByProductId(Long idProduct) {
        return imageRepository.getImagesByProductId(idProduct);
    }


}
