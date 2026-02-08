package org.example;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestSender {

    private final EmailService emailService;

    public TestSender(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-test-mail")
    public String sendMail() {
        emailService.sendEmail(
                "olxsamr.06g@gmail.com",
                "Тестовий лист із Spring Boot",
                "Привіт! Це тест зі stageIsYours"
        );
        return "Letter sent successfully!";
    }
}
