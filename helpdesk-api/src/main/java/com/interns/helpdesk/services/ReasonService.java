package com.interns.helpdesk.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interns.helpdesk.models.Reason;
import com.interns.helpdesk.repositories.ReasonRepository;

@Service
public class ReasonService {
    @Autowired
    ReasonRepository reasonRepository;
    
    public List<Reason> getAll() {
        return reasonRepository.findAll();
    }

    public Reason getById(Long id) {
        try {
            return reasonRepository.findById(id).orElseThrow();
        } catch(Exception e) {
            return null;
        }
    }

    public Reason save(Reason newReason) {
        return reasonRepository.save(newReason);
    }

    public void delete(Long id) {
        reasonRepository.deleteById(id);
    }
}
