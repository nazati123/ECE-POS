package com.capstone.POS.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.POS.exceptions.ResourceNotFoundException;
import com.capstone.POS.models.Faculty;
import com.capstone.POS.repositories.FacultyRepository;
import com.capstone.POS.services.FacultyService;

@RestController
@RequestMapping("/faculty")
public class FacultyController {
    
    @Autowired
    private FacultyService facultyService;

    @Autowired
    private FacultyRepository facultyRepository;

    // Get all faculty members
    @GetMapping
    public ResponseEntity<List<Faculty>> getAllFaculty() {
        List<Faculty> faculty = facultyRepository.findAll();
        return new ResponseEntity<>(faculty, HttpStatus.OK);
    }

    // Get faculty member by email
    @GetMapping("/{email}")
    public ResponseEntity<Faculty> getFacultyByEmail(@PathVariable String email) {
        Faculty faculty = facultyService.getFacultyByEmail(email);
        if (faculty != null) {
            return new ResponseEntity<>(faculty, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Faculty faculty) {
        try {
            facultyService.addFaculty(faculty);
            return ResponseEntity.status(HttpStatus.CREATED).body("Faculty created successfully");
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
    }

    @PutMapping("/{email}")
    public ResponseEntity<Faculty> updateFaculty(@PathVariable String email, @RequestBody Faculty faculty) {
        try {
            Faculty updatedFaculty = facultyService.updateFaculty(email, faculty);
            return ResponseEntity.ok(updatedFaculty);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String email) {
        try {
            facultyService.deleteFaculty(email);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
