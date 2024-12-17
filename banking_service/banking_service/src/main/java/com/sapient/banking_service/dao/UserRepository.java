package com.sapient.banking_service.dao;

import com.sapient.banking_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    /**
     * Retrieves a user by using userId
     * @param userId the ID tye of the user
     * @return the user matching the userId
     */
    User findByUserId(Integer userId);
    /**
     * Retrieves the user by the email
     *
     * @param email of the user
     * @return  the user matches the email
     */
    Optional<User> findByEmail(String email);
}