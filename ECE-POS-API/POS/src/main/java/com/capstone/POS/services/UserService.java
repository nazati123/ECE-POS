package com.capstone.POS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.capstone.POS.exceptions.ResourceNotFoundException;
import com.capstone.POS.models.User;
import com.capstone.POS.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByUsername(String username) {
        Optional<User> user = userRepository.findById(username);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new ResourceNotFoundException("User member not found with username " + username);
        }
    }

    public User addUser(User user) {
        if (userRepository.existsById(user.getUsername())) {
            throw new DuplicateKeyException("User member already exists with username " + user.getUsername());
        } else {
            return userRepository.save(user);
        }
    }

    public User updateUser(String username, User userDetails) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new ResourceNotFoundException("User member not found with username " + username));

        user.setPassword(userDetails.getPassword());

        return userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = userRepository.findById(username)
                .orElseThrow(() -> new ResourceNotFoundException("User member not found with username " + username));

        userRepository.delete(user);
    }
}
