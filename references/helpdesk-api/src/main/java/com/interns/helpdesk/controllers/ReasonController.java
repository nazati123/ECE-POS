package com.interns.helpdesk.controllers;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.interns.helpdesk.exceptions.RecordNotFoundException;
import com.interns.helpdesk.exceptions.ServerException;
import com.interns.helpdesk.models.Reason;
import com.interns.helpdesk.services.ReasonService;

@RestController
@RequestMapping("/api/v1/reasons")
public class ReasonController {
    @Autowired
    private ReasonService reasonService;

    @GetMapping
    public ResponseEntity<List<Reason>> list() {
        return new ResponseEntity<>(reasonService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Reason> get(@PathVariable("id") Long id) {
        Reason reason = reasonService.getById(id);
        if (reason == null) 
            throw new RecordNotFoundException();
        return new ResponseEntity<>(reason, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Reason> create(@RequestBody final Reason newReason) {
        Reason reason = reasonService.save(newReason);
        if (reason == null)
            throw new ServerException();
        return new ResponseEntity<>(reason, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Reason> update(@PathVariable Long id, @RequestBody Reason reason) {
        Reason existingReason = reasonService.getById(id);
        if (existingReason == null)
            throw new RecordNotFoundException();
        BeanUtils.copyProperties(reason, existingReason, "id");
        reasonService.save(existingReason);
        return new ResponseEntity<>(existingReason, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public HttpStatus delete(@PathVariable final Long id) {
        try {
            reasonService.delete(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new RecordNotFoundException();
        }
    }
}