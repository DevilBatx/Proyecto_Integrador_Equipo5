package com.grupo5.MusifyBack.dto;

import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.models.Characteristic;
import com.grupo5.MusifyBack.models.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchProductDTO {
    private Long id;
    private String name;
}
