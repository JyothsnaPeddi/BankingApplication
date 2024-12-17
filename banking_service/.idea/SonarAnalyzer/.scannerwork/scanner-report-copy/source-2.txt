package com.sapient.banking_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@EnableFeignClients
@Configuration
@SpringBootApplication
public class BankingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankingServiceApplication.class, args);
	}

}
