package com.interns.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.interns.helpdesk.models.Reason;

public interface ReasonRepository extends JpaRepository<Reason, Long>{  
}