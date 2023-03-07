package com.interns.helpdesk.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interns.helpdesk.models.Status;
import com.interns.helpdesk.repositories.StatusRepository;

@Service
public class StatusService {
    
    @Autowired
    StatusRepository statusRepository;

    public List<Status> getAll() {
        return statusRepository.findAll();
    }

    public Status getByTicketId(Long id) {
        try {
            return statusRepository.findById(id).orElseThrow();
        } catch(Exception e) {
            return null;
        }
    }
    // public Status getByStatusId(Long id) {
    //     try {
    //         return statusRepository.findStatusByTicketId(id).orElseThrow();
    //     } catch(Exception e) {
    //         return null;
    //     }
    // }

    public Status save(Status newStatus) {
        return statusRepository.save(newStatus);
    }

    public void delete(Long id) {
        statusRepository.deleteById(id);
    }
}
