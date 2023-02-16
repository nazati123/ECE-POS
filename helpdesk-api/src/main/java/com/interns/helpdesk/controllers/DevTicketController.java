package com.interns.helpdesk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.interns.helpdesk.exceptions.RecordNotFoundException;
// import com.interns.helpdesk.messages.ResponseDevTicket;
import com.interns.helpdesk.models.DevTicket;
// import com.interns.helpdesk.models.Status;
// import com.interns.helpdesk.models.Ticket;
// import com.interns.helpdesk.models.User;
import com.interns.helpdesk.services.DevTicketService;

import java.util.List;
// import com.interns.helpdesk.services.StatusService;
// import com.interns.helpdesk.services.TicketService;
// import com.interns.helpdesk.services.UserService;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/v1/dev_tickets")
public class DevTicketController {
  	@Autowired
  	private DevTicketService devTicketService;
    

    //`@GetMapping` has passed the "All-Green to Go" for `list()` and `getById()`

  	@GetMapping
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})
  	public ResponseEntity<List<DevTicket>> list(){
    	List<DevTicket> devTickets = devTicketService.getAll().collect(Collectors.toList());
        if (devTickets == null)
            throw new RecordNotFoundException();
       return new ResponseEntity<>(devTickets, HttpStatus.OK);
    }

    @GetMapping ("{id}")
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<DevTicket> getById(@PathVariable("id") Long id) {     
        DevTicket devTicket = devTicketService.getById(id);
        if (devTicket == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(devTicket, HttpStatus.OK);
    }

    // @GetMapping ("/status/{id}")
    // public ResponseEntity<ResponseDevTicket> getTicketStatusId(@PathVariable("id") Long id) {     
    //     DevTicket devTicket = devTicketService.getByTicketId(id);
    //     if (devTicket == null)
    //     throw new RecordNotFoundException();
    //     User dev = userService.getById(devTicket.getDevId());
    //     Ticket ticket = ticketService.getById(devTicket.getTicketId());
    //     Status status=statusService.getByTicketId(devTicket.getStatusId());
    //     ResponseDevTicket result= new ResponseDevTicket(dev,ticket,status);
    //     return new ResponseEntity<>(result, HttpStatus.OK);
    // }

    @GetMapping("/assigned/{id}")
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<List<DevTicket>> getAllTicketsToDev(@PathVariable("id") Long id) {//This is the `devUser` id (`user` id)
        List<DevTicket> devTickets = devTicketService.getByDevId(id);
        if (devTickets == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(devTickets, HttpStatus.OK);
    }

    

    @PutMapping("{id}") //update a dev_tickets status by the ticket_id
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<DevTicket> updateStatus(@PathVariable Long id, @RequestBody DevTicket newDevTicket) {
        DevTicket existingDevTicket = devTicketService.getById(id);
        if (existingDevTicket == null)
            throw new RecordNotFoundException();
        existingDevTicket.setStatusId(newDevTicket.getStatusId());
        existingDevTicket.setDevId(newDevTicket.getDevId());
        devTicketService.save(existingDevTicket);
        return new ResponseEntity<>(existingDevTicket, HttpStatus.OK);
    }
    @PutMapping("/dev/{id}")  //update or assign a dev_id to a ticket
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<DevTicket> updateDev(@PathVariable Long id, @RequestBody DevTicket newDevTicket) {
        DevTicket existingDevTicket = devTicketService.getById(id);
        if (existingDevTicket == null)
            throw new RecordNotFoundException();
        existingDevTicket.setDevId(newDevTicket.getDevId());
        devTicketService.save(existingDevTicket);
        return new ResponseEntity<>(existingDevTicket, HttpStatus.OK);
    }
}
