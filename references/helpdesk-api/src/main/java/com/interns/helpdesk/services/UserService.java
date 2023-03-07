package com.interns.helpdesk.services;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interns.helpdesk.models.User;
import com.interns.helpdesk.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public Stream<User> getAll() {
        return userRepository.findAllByOrderByIdAsc().stream();
    }

    public User getById(Long id) {
        try {
            return userRepository.findByIdOrderByIdAsc(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }

    public User getByCac(String cacId) {
        try {
            return userRepository.findByCacIdOrderByIdAsc(cacId);
        } catch (Exception e) {
            return null;
        }      
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public String badMappingId(int id){
        switch(id){
            case 1: return "[ERROR: ID MUST HAVE PAIRING ID # (EX: `/id/2`)]";

            case 2: return "[ERROR: ID MUST HAVE PAIRING ID # (EX: `/raw/id/2`)]";

            case 3: return "HAVE YOU TRIED TURNING IT OFF AND BACK ON AGAIN?";

            default: return null;
        }
    }

    public String badMappingCac(int id){
        switch(id){
            case 1: return "[ERROR: CAC MUST HAVE PAIRING CAC-ID # (EX: `/cac/2227778888`)]";

            case 2: return "[ERROR: ID MUST HAVE PAIRING CAC-ID # (EX: `/raw/cac/2227778888`)]";

            case 3: return "HAVE YOU TRIED TURNING IT OFF AND BACK ON AGAIN?";

            default: return null;
        }
    }
}