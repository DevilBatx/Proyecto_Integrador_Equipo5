package com.grupo5.MusifyBack.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserExistsResponse {
    private String message;
    private String userEmail;
}
