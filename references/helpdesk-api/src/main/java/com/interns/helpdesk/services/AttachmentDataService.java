package com.interns.helpdesk.services;
import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interns.helpdesk.repositories.AttachmentDataRepository;
import com.interns.helpdesk.models.AttachmentData;

@Service
public class AttachmentDataService {
    @Autowired
    private AttachmentDataRepository attachmentDataRepository;

    public Stream<AttachmentData> getAll() {
        return attachmentDataRepository.findAll().stream();
    }

    public AttachmentData getById(Long id) {
        try {
            return attachmentDataRepository.findById(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }
    
    public AttachmentData getByTicketId(Long id) {
        try {
            return attachmentDataRepository.findById(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }

    public AttachmentData store(MultipartFile file) throws IOException {
        AttachmentData attachmentData = new AttachmentData(file.getBytes());
        return attachmentDataRepository.save(attachmentData);
    }

    public void delete(Long id) {
        attachmentDataRepository.deleteById(id);
    }
    
    public String badMappingId(int id){
        switch(id){
            case 1: return "[ERROR: ID CAN ONLY BE DATA-TYPE LONG (EX: `/tickets/2`), NO PRECEDING ID REQUIRED (NO `/id/#`)]";

            case 2: return "[ERROR: ID SHOULD ONLY BE A #, NO `/id` ALLOWED]";
    
            case 3: return "HAVE YOU TRIED TURNING IT OFF AND BACK ON AGAIN?";
    
            default: return null;
        }
    }
}
