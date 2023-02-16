package com.interns.helpdesk.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "dev_tickets")
@JsonIgnoreProperties({})
public class DevTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long ticket_id;
    private Long devId;
    private Long status_id;
    
    public DevTicket() {}
    
    public DevTicket(Long id) {
        this.ticket_id=id;
        this.status_id=(long) 1;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Ticket ticket;

    @Column(name = "ticket", nullable = true)
    public Ticket getTicket(){
        return ticket;
    }
    public void setTicket(Ticket ticket){
        this.ticket = ticket;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devId", insertable = false, updatable = false)
    @JsonIgnoreProperties({"tickets", "hibernateLazyInitializer", "handler"})
    private User devUser;

    @Column(name = "devUser", nullable = true)
    public User getDevUser(){
        return devUser;
    }
    public void setDevUser(User devUser){
        this.devUser = devUser;
    }

    @ManyToOne
    @JoinColumn(name = "status_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Status status;

    @Column(name = "status", nullable = false)
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    @Column(name = "id", nullable = false)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Column(name = "ticket_id", nullable = false)
    public Long getTicketId() { return ticket_id; }
    public void setTicketId(Long ticket_id) { this.ticket_id = ticket_id; }

    @Column(name = "status_id", nullable = false)
    public Long getStatusId() { return status_id; }
    public void setStatusId(Long status_id) { this.status_id = status_id; }

    @Column(name = "devId", nullable = true)//, insertable = false, updatable = false
    public Long getDevId() { return devId; }
    public void setDevId(Long devId) { this.devId = devId; }
}