package com.sapient.banking_service.config;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ResourceBundle;

@Service
@Component
public class ResourceBO {
    public static String getKey(String key) {
        return getKey(key, null);
    }
    public static String getKey(String key, String defaultValue)
    {
        if (ResourceBundle.getBundle("message").keySet().contains(key))
        {
            return ResourceBundle.getBundle("message").getString(key);
        }
        else
        {
            return defaultValue;
        }
    }
}