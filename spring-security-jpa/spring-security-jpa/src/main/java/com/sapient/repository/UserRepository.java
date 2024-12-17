package com.sapient.repository;

import com.sapient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUserId(Integer userId);
    Optional<User> findByEmail(String email);
}