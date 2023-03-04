package com.capstone.POS.models;

import jakarta.persistence.*;

@Entity
@Table(name = "faculty_info")
public class Faculty {

    @Id
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    public Faculty() {
    }

    public Faculty(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
