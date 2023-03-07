package com.interns.helpdesk.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interns.helpdesk.models.File;

public interface FileRepository extends JpaRepository<File, Long>{

    public List<File> findAllByOrderById();

    public List<File> findAllByTicketIdOrderById(Long id);

    public File findByIdOrderById(Long id);
}