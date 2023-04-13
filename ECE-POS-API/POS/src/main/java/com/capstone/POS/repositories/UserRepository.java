package com.capstone.POS.repositories;

import com.capstone.POS.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findByUsername(String username);
}