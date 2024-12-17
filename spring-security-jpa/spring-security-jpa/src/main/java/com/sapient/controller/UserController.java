package com.sapient.controller;

import com.sapient.entity.AuthRequest;
import com.sapient.entity.User;
import com.sapient.repository.BankInterface;
import com.sapient.repository.UserRepository;
import com.sapient.service.JwtService;
import com.sapient.service.UserInfoService;
import com.sapient.to.AuthResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private BankInterface bankInterface;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoService userService;

    @PostMapping("/addNewUser")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        String st="";
        try{
            st=userService.addUser(user);
        }catch (Exception ex)
        {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
        return ResponseEntity.ok(st);

    }
    @PostMapping("/sign-in")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
        AuthResponse authResponse = new AuthResponse();
        if (authentication.isAuthenticated()) {
            authResponse.setToken(jwtService.generateToken(authRequest.getUsername()));
            Optional<User> userOptional = userRepository.findByEmail(authRequest.getUsername());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                authResponse.setId(Math.toIntExact(user.getUserId())); // Set the id directly from User entity
            } else {
                throw new UsernameNotFoundException("User not found: " + authRequest.getUsername());
            }
        } else {
            throw new UsernameNotFoundException("Invalid credentials for user: " + authRequest.getUsername());
        }

        return authResponse;
    }


}