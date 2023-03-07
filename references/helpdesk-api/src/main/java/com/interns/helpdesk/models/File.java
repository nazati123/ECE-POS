package com.interns.helpdesk.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "files")
@JsonIgnoreProperties(value = {"ticket", "tickets", "ticketId"})
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String url;
    private String type;
    private Long size;
    private Long ticketId;

    public File(String name, String url, String type, Long size, Long ticketId) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
        this.ticketId = ticketId;
    }

    public File(){
    }
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticketId", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernate", "hibernateLazyInitializer"})
    @JsonIgnore
    private Ticket tickets;

    public Ticket getTicket(){
        return tickets; 
    }
    public void setTicket(Ticket tickets){
        this.tickets = tickets;
    } 

    public Long getTicketId(){
        return ticketId;
    }
    public void setTicketId(Long ticketId){
        this.ticketId = ticketId;
    }

    @Column(name = "id", nullable = false)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Column(name = "name", nullable = true)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @Column(name = "url", nullable = true)
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    @Column(name = "type", nullable = true)
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    @Column(name = "size", nullable = true)
    public Long getSize() { return size; }
    public void setSize(Long size) { this.size = size; }
}

