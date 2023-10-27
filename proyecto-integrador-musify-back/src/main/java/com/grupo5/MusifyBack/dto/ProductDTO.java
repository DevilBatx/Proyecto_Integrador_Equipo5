package com.grupo5.MusifyBack.dto;

import com.grupo5.MusifyBack.models.Images;
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
