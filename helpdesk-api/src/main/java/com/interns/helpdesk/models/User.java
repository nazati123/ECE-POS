package com.interns.helpdesk.models;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "users")
@JsonIgnoreProperties({})
public class User {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cacId;
    private String first_name;
    private String last_name;
    private String phone_num;
    private String email;
    private Integer permission_id;

    public User() {}

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "users")//the `mappedBy` attribute marks the `User` entities (`users`) as the inverse side
    //NOTE: This could be `ticket`, `ticketss` or even `rickroll` ->
    //-> but do know that it can NOT be `tickets` because that is ->
    //-> the name of the entity itself (the class)
    @Fetch(FetchMode.SUBSELECT)
    @JsonIgnoreProperties({"userId", "users"})//Per-Request I took `files` out from showing in users (just kidding, I put it back)
    @OrderBy("id")
    private Set<Ticket> tickets;

    @Column(name = "tickets", nullable = true)
    public Set<Ticket> getTickets() { return tickets; }
    public void setTickets(Set<Ticket> tickets) { this.tickets = tickets; }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "devUser")
    //@JoinColumn(name = "dev_id") 
    @JsonIgnore
    @Fetch(FetchMode.SUBSELECT)
    @OrderBy("id")
    private Set<DevTicket> devTicket;
    
    @Column(name = "devTicket", nullable = true)
    public Set<DevTicket> getDevTicket(){
        return devTicket;
    }
    public void setDevTicket(Set<DevTicket> devTicket){
        this.devTicket = devTicket;
    }


    @Column(name = "id", nullable = false)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    //@ModelAttribute(name = "cacId")
    @Column(name="cacId", nullable = false)
    public String getCacId() { return cacId; }
    public void setCacId(String cacId) { this.cacId = cacId; }

    @Column(name="first_name", nullable = false)
    public String getFirstName() { return first_name; }
    public void setFirstName(String first_name) { this.first_name = first_name; }

    @Column(name="last_name", nullable = false)
    public String getLastName() { return last_name; }
    public void setLastName(String last_name) { this.last_name = last_name; }

    @Column(name="phone_num", nullable = false)
    public String getPhoneNum() { return phone_num; }
    public void setPhoneNum(String phone_num) { this.phone_num = phone_num; }

    @Column(name="email", nullable = false)
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Column(name = "permission_id", nullable = false)
    public Integer getPermissionId() { return permission_id; }
    public void setPermissionId(Integer permission_id) { this.permission_id = permission_id; }
}

