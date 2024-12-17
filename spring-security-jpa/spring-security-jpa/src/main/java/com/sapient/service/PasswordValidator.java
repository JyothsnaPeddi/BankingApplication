package com.sapient.service;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class PasswordValidator {
    public boolean isValidPassword(String password) {
        String passwordregex =
                "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{6,}$";
        Pattern pattern = Pattern.compile(passwordregex);
        return password != null && pattern.matcher(password).matches();
    }
}
