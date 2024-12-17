package com.sapient.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    private String username;
    private String password;

}