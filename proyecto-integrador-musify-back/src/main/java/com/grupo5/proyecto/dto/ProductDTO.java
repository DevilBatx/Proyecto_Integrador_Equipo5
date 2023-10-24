package com.grupo5.proyecto.dto;

import com.grupo5.proyecto.models.Images;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    //private String brand;
    //private String category;
    private Set<Images> images;


}
