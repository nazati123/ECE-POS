package com.interns.helpdesk.models;

import javax.persistence.*;

@Entity(name = "attachments_data")
public class AttachmentData {
    @Id             
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] data;

    public AttachmentData() {}

    public AttachmentData(byte[] data) {
        this.data = data;
    }

    @Column(name = "id", nullable = false)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @Column(name = "data", nullable = false)
    public byte[] getData() { return data; }
    public void setData(byte[] data) { this.data = data; }
}   
