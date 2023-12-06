package com.grupo5.proyecto.persistence.repositories;

import com.grupo5.proyecto.models.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IImageRepository extends JpaRepository<Images, Long> {
}
