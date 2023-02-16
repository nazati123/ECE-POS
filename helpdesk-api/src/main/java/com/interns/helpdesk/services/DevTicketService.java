package com.interns.helpdesk.services;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interns.helpdesk.models.DevTicket;
import com.interns.helpdesk.repositories.DevTicketRepository;

@Service
public class DevTicketService {
    @Autowired
    DevTicketRepository devTicketRepository;

    public Stream<DevTicket> getAll() {
        List<DevTicket> sortedDevTicketList = devTicketRepository.findAllByOrderById();
        return sortedDevTicketList.stream();
     }

    public DevTicket getByTicketId(Long ticket_id) {
        try {
            return devTicketRepository.getByTicketId(ticket_id);
        } catch (Exception e) {
            return null;
        }
    }

    public DevTicket save(DevTicket newDevTicket) {
        return devTicketRepository.save(newDevTicket);
    }

    // public void delete(Long id) {
    //     devTicketRepository.deleteById(id);
    // }

    public void deleteByTicketId(Long id) {
        try {
            //devTicketRepository.deleteById(getByTicketId(id).getId());
        } catch (Exception e) {
            System.out.println("nothing to delete");
        }
        
    }

    public DevTicket updateDevTicketStatusId(Long ticket_id,Integer newStatusId) {
        try {
            return devTicketRepository.updateDevTicketStatusId(ticket_id, newStatusId);
        } catch (Exception e) {
            return null;
        }
    }

    public DevTicket getById(Long id) {
        try {
            return devTicketRepository.findByIdOrderById(id);
        } catch (Exception e) {
            return null;
        }
    }

    public List<DevTicket> getByDevId(Long id){
        try {
            return devTicketRepository.findAllByDevIdOrderById(id);
        } catch (Exception e) {
            return null;
        }
    }



}