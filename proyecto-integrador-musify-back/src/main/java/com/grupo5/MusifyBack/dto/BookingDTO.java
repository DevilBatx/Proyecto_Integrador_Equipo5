package com.grupo5.MusifyBack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long productId;
    private Long userId;
}
