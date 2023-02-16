package com.interns.helpdesk.messages;

import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.models.Status;
import com.interns.helpdesk.models.User;

public class ResponseStatus {
    
    private Status status;

    public ResponseStatus (Status status) {
        this.status = status;
    }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
}

