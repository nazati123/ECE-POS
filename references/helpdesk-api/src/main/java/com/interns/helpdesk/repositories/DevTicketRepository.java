package com.interns.helpdesk.repositories;

import com.interns.helpdesk.models.DevTicket;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DevTicketRepository extends JpaRepository<DevTicket, Long> {

  @EntityGraph(attributePaths = {"ticket", "ticket.reason", "ticket.files", "devUser", "status"})
  public List<DevTicket> findAllByOrderById();

  @EntityGraph(attributePaths = {"ticket", "ticket.reason", "ticket.files", "devUser", "status"})
  public DevTicket findByIdOrderById(Long id);

  //@Query(value= "SELECT * from dev_tickets WHERE dev_id=:dev_id",nativeQuery = true)
  @EntityGraph(attributePaths = {"ticket", "ticket.reason", "ticket.files", "devUser", "status"})
  public List<DevTicket> findAllByDevIdOrderById(Long devId);

  @Query(value = "SELECT * FROM dev_tickets WHERE dev_tickets.ticket_id = :ticket_id", nativeQuery = true)
  DevTicket getByTicketId(Long ticket_id);

   @Query(value = "UPDATE dev_tickets SET status_id =:newStatusId  WHERE id=:id",nativeQuery = true)
   DevTicket updateDevTicketStatusId(Long id,Integer newStatusId);
}