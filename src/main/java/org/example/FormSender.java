package org.example;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class FormSender {

    private final EmailService emailService;

    public FormSender(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-form")
    public String sendForm(@RequestBody Map<String, Object> formData) {

        String emailBody = buildEmailBody(formData);

        emailService.sendEmail(
                "heynoli90@gmail.com",
                "Answers to feedback questionnaire",
                emailBody
        );

        return "Questionnaire sent!";
    }

    private String buildEmailBody(Map<String, Object> formData) {
        StringBuilder sb = new StringBuilder();
        sb.append("Answers:\n\n");

        formData.forEach((key, value) ->
                sb.append(key)
                        .append(": ")
                        .append(value)
                        .append("\n")
        );

        return sb.toString();
    }
}
