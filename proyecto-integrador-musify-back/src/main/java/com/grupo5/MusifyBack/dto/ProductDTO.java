package com.grupo5.MusifyBack.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    //private String brand;
    private Long categoryId;
    private List<Long> imageIds;
//    private List<long> characteristicsId;


}
