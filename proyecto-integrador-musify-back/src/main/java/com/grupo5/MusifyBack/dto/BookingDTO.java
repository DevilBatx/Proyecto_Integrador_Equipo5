package com.grupo5.MusifyBack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Long id;
    private String startDate;
    private String endDate;
    private ProductDTO product;
}
