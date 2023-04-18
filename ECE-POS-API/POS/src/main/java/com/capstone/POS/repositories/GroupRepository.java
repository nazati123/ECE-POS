package com.capstone.POS.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.POS.models.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
