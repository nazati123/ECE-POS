package com.interns.helpdesk.controllers;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.interns.helpdesk.exceptions.RecordNotFoundException;
import com.interns.helpdesk.messages.ResponseMessage;
import com.interns.helpdesk.models.AttachmentData;
import com.interns.helpdesk.models.File;
import com.interns.helpdesk.services.AttachmentDataService;
import com.interns.helpdesk.services.FileService;

@RestController
@RequestMapping("/api/v1/attach")
public class FileController {
    @Autowired
    private FileService fileService;

    @Autowired
    private AttachmentDataService attachmentDataService;

    @GetMapping
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<List<File>> list() {
        List<File> files = fileService.getAll().toList();
      return ResponseEntity.status(HttpStatus.OK).body(files);
    }


    @GetMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<File> getFile(@PathVariable("id") Long id) {
        File file = fileService.getById(id);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    @GetMapping("/data/{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<byte[]> getData(@PathVariable("id") Long id) {
        AttachmentData attachmentData = attachmentDataService.getById(id);
        File file = fileService.getById(id);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
            .body(attachmentData.getData());
    }

    @GetMapping("/image/{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id, HttpServletResponse response){
        AttachmentData attachmentData = attachmentDataService.getById(id);
        byte[] data = attachmentData.getData();
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(data);
    }
    
    @PostMapping("/upload/{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<ResponseMessage> upload(@RequestParam("file") MultipartFile file, @PathVariable("id") Long id) {
        String message = "";
        try {
            AttachmentData attach = attachmentDataService.store(file);
            String attachId = attach.getId().toString();
            String fileDownloadUri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("api/v1/attach/data/")
                .path(attachId)
                .toUriString();
             fileService.store(file, id, fileDownloadUri);

            message = "Uploaded the file sucessfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @PutMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<File> update(@PathVariable Long id, @RequestBody File file) {
        File attach = fileService.getById(id);
        if (attach == null)
            throw new RecordNotFoundException();
        BeanUtils.copyProperties(file, attach, "id");
        fileService.save(attach);
        return new ResponseEntity<>(attach, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public HttpStatus delete(@PathVariable final Long id) {
        try {
            attachmentDataService.delete(id);
            fileService.delete(id);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new RecordNotFoundException();
        }
    }

}