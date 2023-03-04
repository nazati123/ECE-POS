package com.capstone.POS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.capstone.POS.exceptions.ResourceNotFoundException;
import com.capstone.POS.models.Faculty;
import com.capstone.POS.repositories.FacultyRepository;

// @Service
// public class FacultyService {
    
//     @Autowired
//     FacultyRepository facultyRepository;

//     public Faculty save(Faculty newFaculty) {
//         return facultyRepository.save(newFaculty);
//     }
// }
@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFacultyByEmail(String email) {
        Optional<Faculty> faculty = facultyRepository.findById(email);
        if (faculty.isPresent()) {
            return faculty.get();
        } else {
            throw new ResourceNotFoundException("Faculty member not found with email " + email);
        }
    }

    public Faculty addFaculty(Faculty faculty) {
        if (facultyRepository.existsById(faculty.getEmail())) {
            throw new DuplicateKeyException("Faculty member already exists with email " + faculty.getEmail());
        } else {
            return facultyRepository.save(faculty);
        }
    }

    public Faculty updateFaculty(String email, Faculty facultyDetails) {
        Faculty faculty = facultyRepository.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty member not found with email " + email));

        faculty.setName(facultyDetails.getName());

        return facultyRepository.save(faculty);
    }

    public void deleteFaculty(String email) {
        Faculty faculty = facultyRepository.findById(email)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty member not found with email " + email));

        facultyRepository.delete(faculty);
    }
}