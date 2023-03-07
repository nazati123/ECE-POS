package com.interns.helpdesk.messages;

import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.models.Status;

public class ResponseDev {

    private Status status;
    private Ticket ticket;
    public ResponseDev(Ticket ticket,Status status){
        this.ticket = ticket;
        this.status = status;
    }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public Ticket getTicket() { return ticket; }
    public void setTicket(Ticket ticket) { this.ticket = ticket; }

    
}

