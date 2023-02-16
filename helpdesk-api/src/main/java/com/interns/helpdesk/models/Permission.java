package com.interns.helpdesk.models;

import javax.persistence.*;

@Entity(name = "permissions")
public class Permission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String permission_level;
  
	@Column(name = "id", nullable = false)
  	public Long getId() { return id; }
  	public void setId(Long id) { this.id = id; }

  	@Column(name = "permission_level", nullable = false)
  	public String getPermissionLevel() { return permission_level; }
  	public void setPermissionLevel(String permission_level) { this.permission_level = permission_level; }
}