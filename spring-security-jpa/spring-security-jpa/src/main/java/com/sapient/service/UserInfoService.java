package com.sapient.service;

import com.sapient.entity.User;

import com.sapient.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private PasswordValidator passwordValidator;
    @Autowired
    private EmailvalidatorService emailvalidator;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = repository.findByEmail(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public String addUser(User userInfo)throws Exception {

        String email = userInfo.getEmail();
        if (!emailvalidator.isValidEmail(email)) {
            throw new Exception("Invalid Email");
        }
        String password = userInfo.getPassword();
        if (!passwordValidator.isValidPassword(password)) {
            throw new Exception("Invalid Password");
        }
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";

    }



}
