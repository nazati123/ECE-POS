package com.interns.helpdesk.messages;

import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.models.Status;
import com.interns.helpdesk.models.User;

public class ResponseDevTicket {
    
    private User dev;
    private Status status;
    private Ticket ticket;

    public ResponseDevTicket (User dev, Ticket ticket, Status status) {
        this.dev = dev;
        this.ticket = ticket;
        this.status = status;
    }

    public User getDev() { return dev; }
    public void setDev(User dev) { this.dev = dev; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }
}

