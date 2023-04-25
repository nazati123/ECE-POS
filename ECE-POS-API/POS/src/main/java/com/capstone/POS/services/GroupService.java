package com.capstone.POS.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import com.capstone.POS.exceptions.ResourceNotFoundException;
import com.capstone.POS.models.Group;
import com.capstone.POS.repositories.GroupRepository;

@Service
public class GroupService {
    
    @Autowired
    private GroupRepository groupRepository;

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }
    
    public Group getGroupById(Long id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isPresent()) {
            return group.get();
        } else {
            throw new ResourceNotFoundException("Group not found with id " + id);
        }
    }

    public Group addGroup(Group group) {
        if (groupRepository.existsById(group.getId())) {
            throw new DuplicateKeyException("Group already exists with id " + group.getId());
        } else {
            return groupRepository.save(group);
        }
    }

    public Group updateGroup(Long id, Group groupDetails) {
        Group group = groupRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Group not found with id " + id));

        group.setGroupName(groupDetails.getGroupName());

        return groupRepository.save(group);
    }

    public Group save(Group newGroup) {
        return groupRepository.save(newGroup);
    }

    public void deleteGroup(Long id) {
        Group group = groupRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Group not found with id " + id));

        groupRepository.delete(group);
    }
}