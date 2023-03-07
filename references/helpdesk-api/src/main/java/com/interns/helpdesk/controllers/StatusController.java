package com.interns.helpdesk.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.interns.helpdesk.exceptions.RecordNotFoundException;
import com.interns.helpdesk.models.Status;
import com.interns.helpdesk.services.StatusService;

@RestController
@RequestMapping("/api/v1/status")
public class StatusController {
    @Autowired
    private StatusService statusService;

    @GetMapping
    public ResponseEntity<List<Status>> list() {
        return new ResponseEntity<>(statusService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Status> get(@PathVariable("id") Long id) {
        Status status = statusService.getByTicketId(id);
        if (status == null) 
            throw new RecordNotFoundException();
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

}