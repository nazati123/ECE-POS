package com.interns.helpdesk.controllers;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.interns.helpdesk.config.MailGenerator;
import com.interns.helpdesk.exceptions.RecordNotFoundException;
import com.interns.helpdesk.models.DevTicket;
import com.interns.helpdesk.models.File;
import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.models.User;
import com.interns.helpdesk.services.DevTicketService;
import com.interns.helpdesk.services.FileService;
import com.interns.helpdesk.services.TicketService;
import com.interns.helpdesk.services.UserService;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private DevTicketService devTicketService;

    @Autowired
    private FileController fileController;

    @Autowired
    private FileService fileService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private MailGenerator mailGenerator;

    //`@GetMapping` has passed the "All-Green to Go" for `list()` and `getById()`

    @GetMapping
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<List<Ticket>> list() {
        List<Ticket> tickets = ticketService.getAll().collect(Collectors.toList());
        if (tickets == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<Ticket> getById(@PathVariable("id") Long id) {
            Ticket tickets = ticketService.getById(id);
            if (tickets == null)
            throw new RecordNotFoundException();
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }


    @PostMapping
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<Ticket> create(@RequestParam(value = "file", required = false) MultipartFile myFile[],@RequestParam("userId") Long user_id, @RequestParam("reasonId") Long reason_id, @RequestParam("subject") String subject, @RequestParam("comment") String comment, @RequestParam("url") String url) throws MessagingException, IOException{
        Ticket ticket = new Ticket(
            user_id,
            reason_id,
            subject,
            comment,
            url
        );
        Ticket newTicket = ticketService.save(ticket);
        if(myFile != null){
            for(int i = 0; i < myFile.length; i++){
                if(i == 3){
                    System.out.println("[NOTICE: ATTEMPTED TO ADD GREATER THAN THREE ATTACHMENTS, ONLY FIRST THREE SUCCSESSFULLY ADDED]");
                    break;
                }
                fileController.upload(myFile[i], newTicket.getId());
            }
        }
        
        DevTicket newDevTicket = new DevTicket(newTicket.getId());
        devTicketService.save(newDevTicket);

        User user = userService.getById(user_id);
        List<File> attachFiles = fileService.findAllByTicketId(ticket.getId());

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        //MimeMessageHelper email = new MimeMessageHelper(mimeMessage,1);
        MimeMessageHelper email = new MimeMessageHelper(mimeMessage, true, "utf-8");
        try {
            email.setFrom("eodims.helpdesk@gmail.com");
            email.setTo(user.getEmail());
            email.setSubject("#" + newTicket.getId() + ": Ticket recieved confirmation");
            email.setText(mailGenerator.generateHtmlMail(newTicket/*, myFile*/), true);
            if(myFile != null){
                for(int i = 0; i < myFile.length; i++){
                    if(i == 3){
                        break;
                    }
                    //NOTE: Line below is to add images in the actual html inline
                    //email.addInline(myFile[i].getOriginalFilename().replaceAll("\\s", ""), myFile[i], myFile[i].getContentType());
                    email.addAttachment(attachFiles.get(i).getName(), myFile[i]);
                }
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);

        return new ResponseEntity<>(newTicket, HttpStatus.OK);
    }


    @PutMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<Ticket> update(@PathVariable Long id, @RequestBody Ticket newTicket) throws MessagingException {
        Ticket existingTicket = ticketService.getById(id);
        if (existingTicket == null)
            throw new RecordNotFoundException();
        Long ticketId = existingTicket.getId();
        existingTicket.setUserId(newTicket.getUserId());
        existingTicket.setReasonId(newTicket.getReasonId());
        existingTicket.setSubject(newTicket.getSubject());
        existingTicket.setComment(newTicket.getComment());
        existingTicket.setUrl(newTicket.getUrl());
        existingTicket.setActive(newTicket.getActive());

        if(existingTicket.getActive() == false){
        User user = userService.getById(existingTicket.getUserId());

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        //MimeMessageHelper email = new MimeMessageHelper(mimeMessage,1);
        MimeMessageHelper email = new MimeMessageHelper(mimeMessage, true, "utf-8");
        try {
            email.setFrom("eodims.helpdesk@gmail.com");
            email.setTo(user.getEmail());
            email.setSubject("#" + existingTicket.getId() + ": Ticket resolved confirmation");
            email.setText(mailGenerator.deleteHtmlMail(existingTicket), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
        }
        ticketService.save(existingTicket);
        return new ResponseEntity<>(existingTicket, HttpStatus.OK);
    }


    @DeleteMapping("{id}")
    @RolesAllowed({"helpdesk-user", "helpdesk-admin", "helpdesk-dev"})
    public ResponseEntity<String> delete(@PathVariable final Long id) {
        try {
            Ticket existingTicket = ticketService.getById(id);
            Long ticketId = existingTicket.getId();
            ticketService.updateActive(id);
        if(existingTicket.getActive() == false){
        User user = userService.getById(existingTicket.getUserId());

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        //MimeMessageHelper email = new MimeMessageHelper(mimeMessage,1);
        MimeMessageHelper email = new MimeMessageHelper(mimeMessage, true, "utf-8");
        try {
            email.setFrom("eodims.helpdesk@gmail.com");
            email.setTo(user.getEmail());
            email.setSubject("#" + existingTicket.getId() + ": Ticket resolved confirmation");
            email.setText(mailGenerator.deleteHtmlMail(existingTicket), true);
        }catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mimeMessage);
            }
            devTicketService.updateDevTicketStatusId(id, 5);


            String response = "[TICKET with ID: " + id + " has successfully been removed (and all of its dependent entities)]";

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new RecordNotFoundException();
        }
    }

    //Bad Mapping Area:

    @GetMapping("/id/{id}")
    public ResponseEntity<String> getIdIdBM(){
        String response = ticketService.badMappingId(1);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<String> getIdBM(){
        String response = ticketService.badMappingId(2);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}