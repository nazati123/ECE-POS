package com.interns.helpdesk.models;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "reasons")
public class Reason {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String reason_desc;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "reason")
	//@JoinColumn(name = "reason_id")
	@Fetch(FetchMode.SUBSELECT)
	@JsonIgnore
	private Set<Ticket> tickets;

	@Column(name = "tickets", nullable = true)
	public Set<Ticket> getTickets(){
		return tickets;
	}
	public void setTickets(Set<Ticket> tickets){
		this.tickets = tickets;
	}

	@Column(name = "id", nullable = false)
	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	@Column(name = "reason_desc")
  	public String getReasonDesc() { return reason_desc; }
  	public void setReasonDesc(String reason_desc) { this.reason_desc = reason_desc; }
}
