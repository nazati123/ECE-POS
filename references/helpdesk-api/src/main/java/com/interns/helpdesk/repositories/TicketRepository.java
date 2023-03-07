package com.interns.helpdesk.repositories;

import com.interns.helpdesk.models.Ticket;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @EntityGraph(attributePaths = {"reason", "files"})
    public List<Ticket> findAllByOrderByIdAsc();

    @EntityGraph(attributePaths = {"reason", "files"})
    public Optional<Ticket> findByIdOrderById(Long id);

    @Query(value = "SELECT t.id, t.reason_id, t.subject, t.comment, t.url, t.time_stamp, t.user_id, t.active FROM users as u, tickets as t Where u.id=:id and u.id = t.user_id", nativeQuery = true)
    List<Ticket> findAllBound(Long id);

    @Query(value = "UPDATE tickets SET active = false WHERE id=:id",nativeQuery = true)
    Ticket updateActiveById(Long id);

    @Query(value = "SELECT * FROM tickets  WHERE active = 'true' ORDER BY id;", nativeQuery = true)
    List<Ticket> findAllActiveTickets();
    
    @Query(value = "SELECT * FROM tickets  WHERE active = 'false' ORDER BY id;", nativeQuery = true)
    List<Ticket> findAllInactiveTickets();
}