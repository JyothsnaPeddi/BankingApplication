package com.sapient.controller;

import com.sapient.entity.User;
import com.sapient.service.UserInfoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserControllerTests {
    @Mock
    private UserInfoService userService;
    @InjectMocks
    private UserController userController;
    @Test
    void addNewUSer() throws Exception {
        User user=new User();
        user.setUserId(1);
        user.setEmail("palurisahithi@gmail.com");
        user.setBankAccounts(null);
        when(userService.addUser(user)).thenReturn(String.valueOf(user));
        ResponseEntity<String> result=userController.addNewUser(user);
        assertEquals(HttpStatus.OK,result.getStatusCode());

    }
    @Test
    void addNewUser_test() throws Exception {
        User user=new User();
        user.setUserId(1);
        user.setEmail("pgmail.com");
        user.setBankAccounts(null);
        when(userService.addUser(user)).thenThrow(new RuntimeException("Invalid Email"));
        ResponseEntity<String> result=userController.addNewUser(user);
        assertEquals(HttpStatus.BAD_REQUEST,result.getStatusCode());
    }
    @Test
    void addNewUser_invalidPassword() throws Exception {
        User user=new User();
        user.setUserId(1);
        user.setEmail("paluri@gmail.com");
        user.setPassword("122");
        user.setBankAccounts(null);
        when(userService.addUser(user)).thenThrow(new RuntimeException("Invalid Password"));
        ResponseEntity<String> result=userController.addNewUser(user);
        assertEquals(HttpStatus.BAD_REQUEST,result.getStatusCode());
    }

}
