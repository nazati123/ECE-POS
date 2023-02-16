package com.interns.helpdesk.models;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "tickets")
@JsonIgnoreProperties(value = {})
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long user_id;
    private Long reason_id;
    private String subject;
    private String comment;
    private String url;
    @CreationTimestamp
    private Timestamp time_stamp;
    private Boolean active;

    
    public Ticket() {}

    public Ticket(Long user_id, Long reason_id, String subject, String comment, String url) {
        this.user_id = user_id;
        this.reason_id = reason_id;
        this.subject = subject;
        this.comment = comment;
        this.url = url;
        this.active = true;
    }
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ticket")
    @JsonIgnore
    @JsonIgnoreProperties({"hibernate", "hibernateLazyInitializer"})
    @Fetch(FetchMode.SUBSELECT)
    private Set<DevTicket> devTicket;
    
    @Column(name = "devTicket", nullable = true)
    public Set<DevTicket> getDevTicket(){
        return devTicket;
    }
    public void setDevTicket(Set<DevTicket> devTicket){
        this.devTicket = devTicket;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reason_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernate", "hibernateLazyInitializer"})
    private Reason reason;

    @Column(name = "reason", nullable = false)
    public Reason getReason() { return reason; }
    public void setReason(Reason reason) { this.reason = reason; }


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "tickets")
    @Fetch(FetchMode.SUBSELECT)//This is the how it should be fetched, `FetchType` is the when it should be fetched (THIS SOLVED THE "N+1" PROBLEM YESSSSSS)
    @JsonIgnoreProperties({"hibernate", "hibernateLazyInitializer"})
    private Set<File> files;
    
    @Column(name = "files", nullable = true)
    public Set<File> getFiles(){
      return files;
    }
    public void setFiles(Set<File> files){
      this.files = files;
    }
    
    @ManyToOne(fetch = FetchType.LAZY)//`@ManyToOne` fetchtype is `EAGER` by default
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernate", "hibernateLazyInitializer"})
    @JsonIgnore
    private User users;

    @Column(name = "users", nullable = true)
    public User getUsers(){
        return users;
    }
    public void setUsers(User users){
        this.users = users;
    }

    @Column(name = "id", nullable = true)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Column(name = "user_id", nullable = false)
    public Long getUserId() { return user_id; }
    public void setUserId(Long user_id) { this.user_id = user_id; }

    @Column(name = "reason_id", nullable = false)
    public Long getReasonId() { return reason_id; }
    public void setReasonId(Long reason_id) { this.reason_id = reason_id; }

    @Column(name = "subject", nullable = false)
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    @Column(name = "comment", nullable = true)
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    @Column(name = "url", nullable = false)
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    @Column(name = "time_stamp", nullable = true)
    public Timestamp getTimeStamp() { return time_stamp; }
    public void setTimeStamp(Timestamp time_stamp) {this.time_stamp = time_stamp; }

    @Column(name = "active", nullable = true)
    public Boolean getActive(){
        return active;
    }
    public void setActive(Boolean active){
        this.active = active;
    }
}
