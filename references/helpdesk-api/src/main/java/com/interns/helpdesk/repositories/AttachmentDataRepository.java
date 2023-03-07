package com.interns.helpdesk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.interns.helpdesk.models.AttachmentData;

public interface AttachmentDataRepository extends JpaRepository<AttachmentData, Long>{
    
}