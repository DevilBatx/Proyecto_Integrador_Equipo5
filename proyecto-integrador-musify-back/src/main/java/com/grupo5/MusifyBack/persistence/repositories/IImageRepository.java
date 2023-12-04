package com.grupo5.MusifyBack.persistence.repositories;

import com.grupo5.MusifyBack.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {
    Set<Image> getImagesByProductId(Long idProduct);
}
