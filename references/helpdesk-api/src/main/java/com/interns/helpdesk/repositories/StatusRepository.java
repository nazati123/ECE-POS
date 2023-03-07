package com.interns.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.interns.helpdesk.models.Status;

public interface StatusRepository extends JpaRepository<Status, Long>{  
  
}