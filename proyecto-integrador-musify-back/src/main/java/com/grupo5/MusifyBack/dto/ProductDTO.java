package com.grupo5.MusifyBack.dto;

import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.models.Image;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    //private String brand;
    //private String category;
    private Set<Image> images;


}
