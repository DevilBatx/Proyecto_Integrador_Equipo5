package com.grupo5.MusifyBack.services.impl;
import javax.mail.*;
import javax.mail.internet.*;
import com.grupo5.MusifyBack.services.IEmailService;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;


import java.net.Socket;
import java.util.Properties;

@Service
public class EmailService implements IEmailService {
    @Autowired
    private Environment env;

    @Value("${mail.smtp.host}")
    private String host ;
    @Value("${mail.smtp.port}")
    private String port;
    @Value("${mail.smtp.auth}")
    private String auth;
    @Value("${mail.smtp.ssl.enable}")
    private String sslenable;
    @Value("${mail.username}")
    private String username;
    @Value("${mail.password}")
    private String password;

    @Value("${mail.from}")
    private String from;

    @Value("${mail.smtp.starttls.required}")
    private String starttls;

    @Value("${mail.smtp.ssl.protocols}")
    private String sslprotocols;


    public void sendEmail(String to, String subject, String text) {
        Properties properties = System.getProperties();

        properties.put("mail.debug", "true");

        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", auth);
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);

        properties.put("mail.smtp.starttls.enable", starttls);
        properties.setProperty("mail.smtp.ssl.protocols", "TLSv1.1 TLSv1.2");

        Session session = Session.getInstance(properties, null);

        session.setDebug(true);

        try {

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);

            message.setContent(text, "text/html; charset=utf-8");

            SMTPTransport t = (SMTPTransport)session.getTransport("smtp");
            t.connect(host, username, password);
            t.sendMessage(message, message.getAllRecipients());

        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }










}
