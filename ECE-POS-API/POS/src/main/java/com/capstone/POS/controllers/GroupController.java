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
import com.capstone.POS.models.Group;
import com.capstone.POS.repositories.GroupRepository;
import com.capstone.POS.services.GroupService;

@RestController
@RequestMapping("/groups")
public class GroupController {
    
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> group = groupRepository.findAll();
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable Long id) {
        Group group = groupService.getGroupById(id);
        if (group != null) {
            return new ResponseEntity<>(group, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Group> create(@RequestBody Group group) {
        Group newGroup = groupService.save(group);
        return new ResponseEntity<>(newGroup, HttpStatus.OK);
        // try {
        //     groupService.addGroup(group);
        //     return ResponseEntity.status(HttpStatus.CREATED).body("Group created successfully");
        // } catch (DuplicateKeyException e) {
        //     return ResponseEntity.status(HttpStatus.CONFLICT).body("This group already exists");
        // }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody Group group) {
        try {
            Group updatedGroup = groupService.updateGroup(id, group);
            return ResponseEntity.ok(updatedGroup);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        try {
            groupService.deleteGroup(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
