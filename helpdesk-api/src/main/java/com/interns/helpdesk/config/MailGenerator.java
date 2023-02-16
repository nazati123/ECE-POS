package com.interns.helpdesk.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.interns.helpdesk.models.Reason;
import com.interns.helpdesk.models.Ticket;
import com.interns.helpdesk.services.AttachmentDataService;
import com.interns.helpdesk.services.FileService;
import com.interns.helpdesk.services.ReasonService;
import com.interns.helpdesk.services.TicketService;
import com.interns.helpdesk.services.UserService;

@Component
public class MailGenerator {
    @Autowired
    TemplateEngine templateEngine;

    @Autowired
    UserService userService;

    @Autowired
    TicketService ticketService;

    @Autowired
    ReasonService reasonService;

    @Autowired
    FileService fileService;

    @Autowired
    AttachmentDataService attachmentDataService;

    public String generateHtmlMail(Ticket newTicket/*, MultipartFile myFile[]*/){
        Reason reason = reasonService.getById(newTicket.getReasonId());
        //List<File> files = fileService.findAllByTicketId(newTicket.getId());
        List<String> listOfData = new ArrayList<>();
        Map<String, Object> variables = new HashMap<>();

        variables.put("ticketId", newTicket.getId());
        variables.put("subject", newTicket.getSubject());
        variables.put("comment", newTicket.getComment());
        variables.put("url", newTicket.getUrl());
        variables.put("reason", reason.getReasonDesc());
        //NOTE: Below is for adding images to the actual html inline
        // for(int i = 0; i < myFile.length; i++){
        //     if(i == 3){
        //         break;
        //     }
        //     String imageName = myFile[i].getOriginalFilename().replaceAll("\\s", "");
        //     listOfData.add("cid:"+imageName);
        // }
        variables.put("files", listOfData);
        variables.put("timestamp", newTicket.getTimeStamp());

        final String templateFileName = "newTicketEmail";
        String htmlMsg = templateEngine.process(templateFileName, new Context(Locale.getDefault(), variables));//NOTE: `Locale.getDefault()` gets the geographical ->
        //-> location of the JVM during startup based on the host environment
        
        return htmlMsg;
    }

    public String deleteHtmlMail(Ticket newTicket){
        Reason reason = reasonService.getById(newTicket.getReasonId());
        //List<File> files = fileService.findAllByTicketId(newTicket.getId());
        List<String> listOfData = new ArrayList<>();
        Map<String, Object> variables = new HashMap<>();

        variables.put("ticketId", newTicket.getId());
        variables.put("subject", newTicket.getSubject());
        variables.put("comment", newTicket.getComment());
        variables.put("url", newTicket.getUrl());
        variables.put("reason", reason.getReasonDesc());
        //NOTE: Below is for adding images to the actual html inline
        // for(int i = 0; i < myFile.length; i++){
        //     if(i == 3){
        //         break;
        //     }
        //     String imageName = myFile[i].getOriginalFilename().replaceAll("\\s", "");
        //     listOfData.add("cid:"+imageName);
        // }
        variables.put("files", listOfData);
        variables.put("timestamp", newTicket.getTimeStamp());

        final String templateFileName = "archiveTicketEmail";
        String htmlMsg = templateEngine.process(templateFileName, new Context(Locale.getDefault(), variables));//NOTE: `Locale.getDefault()` gets the geographical ->
        //-> location of the JVM during startup based on the host environment
        
        return htmlMsg;
    }
}
