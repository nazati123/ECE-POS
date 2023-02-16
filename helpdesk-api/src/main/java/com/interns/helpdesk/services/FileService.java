package com.interns.helpdesk.services;

import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interns.helpdesk.repositories.FileRepository;
import com.interns.helpdesk.models.File;

@Service
public class FileService{
    @Autowired
    private FileRepository fileRepository;

    public Stream<File> getAll() {
        return fileRepository.findAllByOrderById().stream();
    }

    public List<File> findAllByTicketId(Long id){
        try{
            return fileRepository.findAllByTicketIdOrderById(id);
        }catch (Exception e){
            return null;
        }

    }

    public File getById(Long id) {
        try {
            return fileRepository.findByIdOrderById(id);
        } catch (Exception e) {
            return null;
        }
    }

    public File save(File newAttachmentInfo) {
        return fileRepository.save(newAttachmentInfo);
    }

    public void delete(Long id) {
        fileRepository.deleteById(id);
    }

    public File store(MultipartFile file, Long id, String fileDownloadUri) {
        File newAttach = new File(file.getOriginalFilename(), fileDownloadUri, file.getContentType(), file.getSize(), id);
        return fileRepository.save(newAttach);
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
