package com.interns.helpdesk.models;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "status")
public class Status { 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String status_desc;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	@Fetch(FetchMode.SUBSELECT)
	@JsonIgnore
	private Set<DevTicket> devTickets;

	@Column(name = "devTickets", nullable = true)
	public Set<DevTicket> getDevTickets(){
		return devTickets;
	}
	public void setDevTickets(Set<DevTicket> devTickets){
		this.devTickets = devTickets;
	}

	@Column(name = "id", nullable = false)
	public Long getId() { return id; }
  	public void setId(Long id) { this.id = id; }

  	@Column(name = "status_desc", nullable = false)
  	public String getStatusDesc() { return status_desc; }
  	public void setStatusDesc(String status_desc) { this.status_desc = status_desc; }
}