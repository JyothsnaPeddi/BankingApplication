package com.sapient.banking_service.entity;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserTests {
    @Test
    public void testNoArgsConstructor() {
        // Arrange
        User user = new User();

        // Act & Assert
        assertNotNull(user);
        assertNull(user.getUserId());
        assertNull(user.getFirstName());
        assertNull(user.getLastName());
        assertNull(user.getEmail());
        assertNull(user.getMobileNumber());
        assertNull(user.getPassword());
        assertNotNull(user.getBankAccounts());
        assertTrue(user.getBankAccounts().isEmpty());
    }

    @Test
    public void testAllArgsConstructor() {
        // Arrange
        Integer userId = 1;
        String firstName = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String mobileNumber = "1234567890";
        String password = "password";
        List<BankAccount> bankAccounts = new ArrayList<>();

        // Act
        User user = new User(userId, firstName, lastName, email, mobileNumber, password, bankAccounts);

        // Assert
        assertNotNull(user);
        assertEquals(userId, user.getUserId());
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(email, user.getEmail());
        assertEquals(mobileNumber, user.getMobileNumber());
        assertEquals(password, user.getPassword());
        assertNotNull(user.getBankAccounts());
        assertEquals(bankAccounts, user.getBankAccounts());
    }
    @Test
    public void testGettersAndSetters() {
        User user = new User();

        // Test userId
        user.setUserId(1);
        assertEquals(user.getUserId(),1);

        // Test firstName
        user.setFirstName("John");
        assertEquals(user.getFirstName(),"John");

        // Test lastName
        user.setLastName("Doe");
        assertEquals(user.getLastName(),"Doe");

        // Test email
        user.setEmail("john.doe@example.com");
        assertEquals(user.getEmail(),"john.doe@example.com");

        // Test mobileNumber
        user.setMobileNumber("1234567890");
        assertEquals(user.getMobileNumber(),"1234567890");

        // Test password
        user.setPassword("password123");
        assertEquals(user.getPassword(),"password123");

        // Test bankAccounts
        List<BankAccount> bankAccounts = new ArrayList<>();
        BankAccount account = new BankAccount();
        bankAccounts.add(account);
        user.setBankAccounts(bankAccounts);
        assertEquals(user.getBankAccounts(),bankAccounts);
    }


}
