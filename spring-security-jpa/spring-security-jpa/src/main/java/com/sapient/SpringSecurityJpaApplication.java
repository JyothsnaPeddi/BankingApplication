package com.sapient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@EnableFeignClients
@Configuration
@SpringBootApplication
public class SpringSecurityJpaApplication {
	private static final Logger logger = LoggerFactory.getLogger(SpringBootApplication.class);

	public static void main(String[] args) {

		SpringApplication.run(SpringSecurityJpaApplication.class, args);
	}

}
