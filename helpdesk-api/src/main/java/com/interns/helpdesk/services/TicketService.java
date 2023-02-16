package com.interns.helpdesk.services;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.repositories.TicketRepository;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;

   
    public Stream<Ticket> getAll() {
        List<Ticket> sortedList = ticketRepository.findAllByOrderByIdAsc();
        sortedList.sort(Comparator.comparing(Ticket::getId));
    
        return sortedList.stream();
    }

    public Ticket getById(Long id) {
        try {
            return ticketRepository.findByIdOrderById(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }
    public Stream<Ticket>  getAllActive() {
        List<Ticket> sortedActiveTickets = ticketRepository.findAllActiveTickets();
        sortedActiveTickets.sort(Comparator.comparing(Ticket::getId));
    
        return sortedActiveTickets.stream();
        
    }
    public Stream<Ticket>  getAllInactive() {
        List<Ticket> sortedInactiveTickets = ticketRepository.findAllInactiveTickets();
        sortedInactiveTickets.sort(Comparator.comparing(Ticket::getId));
    
        return sortedInactiveTickets.stream();
        
    }

    public List<Ticket> findAllTicketsByUserId(Long id){
        try{
            return ticketRepository.findAllBound(id);
        }catch (Exception e){
            return null;
        }

    }

    public Ticket save(Ticket newTicket) {
        return ticketRepository.save(newTicket);
    }

    public void updateActive(Long id) {
        ticketRepository.updateActiveById(id);
    }

    public void delete(Long id) {
        ticketRepository.deleteById(id);
    }

    public String badMappingId(int id){
        switch(id){
            case 1: return "[ERROR: ID CAN ONLY BE DATA-TYPE LONG (EX: `/tickets/2`), NO PRECEDING ID REQUIRED (NO `/id/#`)]";

            case 2: return "[ERROR: ID SHOULD ONLY BE A #, NO `/id` ALLOWED]";
    
            case 3: return "HAVE YOU TRIED TURNING IT OFF AND BACK ON AGAIN?";
    
            default: return null;
        }
    }
}