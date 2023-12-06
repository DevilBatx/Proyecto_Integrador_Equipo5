package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.models.Image;

import java.util.List;
import java.util.Set;


public interface IImageService {
    List<Image> getAllImages();

    Set<Image> getImagesByProductId(Long idProduct);


}
