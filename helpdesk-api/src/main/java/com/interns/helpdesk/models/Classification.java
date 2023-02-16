package com.interns.helpdesk.models;

import javax.persistence.*;

@Entity(name = "classifications")
public class Classification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String class_level;
    
    @Column(name = "id", nullable = false)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Column(name= "class_level", nullable = false)
    public String getClassLevel() { return class_level; }
    public void setClassLevel(String class_level) { this.class_level = class_level; }
}

