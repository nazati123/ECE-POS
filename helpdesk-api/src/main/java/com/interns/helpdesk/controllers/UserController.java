package com.interns.helpdesk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.interns.helpdesk.exceptions.RecordNotFoundException;
import com.interns.helpdesk.exceptions.ServerException;
import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.models.User;
import com.interns.helpdesk.services.TicketService;
import com.interns.helpdesk.services.UserService;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketController ticketController;


    //`@GetMapping` has passed the "All-Green to Go" for `list()` and `getById()`

    @GetMapping
    @RolesAllowed({"helpdesk-admin", "helpdesk-dev"})   
    public ResponseEntity<List<User>> list() {
        List<User> users = userService.getAll().collect(Collectors.toList());
        if (users == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<User> getById(@PathVariable("id")Long id){
        User user = userService.getById(id);
        if (user == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/cac/{cac_id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<User> get(@PathVariable("cac_id")String cacId){
        User user = userService.getByCac(cacId);
        if (user == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<User> create(@RequestBody final User newUser) {
        User user = userService.save(newUser);
        if (user == null) 
            throw new ServerException();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @PutMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        User existingUser = userService.getById(id);
        if (existingUser == null)
            throw new RecordNotFoundException();
        BeanUtils.copyProperties(user, existingUser, "id");
        userService.save(existingUser);
        return new ResponseEntity<>(existingUser, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<String> delete(@PathVariable final Long id) {
        try {
            String response = "[USER with ID: " + id + " has successfully been removed (and all of its dependent entities)]";
            List<Ticket> tickets = ticketService.findAllTicketsByUserId(id);
            int index = 0;
            while(tickets.isEmpty() != true){
                Long ticket_id = tickets.get(index).getId();
                ticketController.delete(ticket_id);
                index++;
            }
            userService.delete(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new RecordNotFoundException();
        }
    }

    //Bad Mapping Area
    @GetMapping("/cac")
    public ResponseEntity<String> getCac(){
        String response = userService.badMappingCac(1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/id")
    public ResponseEntity<String> getId(){
        String response = userService.badMappingId(1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
