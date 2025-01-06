package project.back.msnotifications.events;


import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import project.back.msnotifications.events.core.users.BaseUserEvent;
import project.back.msnotifications.events.core.users.payload.UserTopicPayload;
import project.back.msnotifications.service.EmailService;

@Component
@RequiredArgsConstructor
public class EventListener {
    private final Mapper eventMapper;

    @Resource
    private final EmailService emailService;

    @KafkaListener(topics = "${spring.kafka.users-topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void listen(ConsumerRecord<String, String> message) {
        BaseUserEvent ev = this.eventMapper.convertToObject(message.value(), BaseUserEvent.class);
        System.out.println("Received event in users topic: " + message.value());
        if(ev == null) return;
        switch (ev.getType()) {
            case EMAIL_VERIFICATION:
                this.handleEmailVerification(ev.getData());
                break;
            case RESET_PASSWORD:
                this.handlePasswordReset(ev.getData());
                break;
        }
    }


    protected void handleEmailVerification(UserTopicPayload data) {
        try {
            this.emailService.sendEmail(data.getEmail(), "Email Verification", data.getCode());
        } catch (Exception e) {
            System.out.println("Error sending email verification " + e);
        }
    }

    protected void handlePasswordReset(UserTopicPayload data) {
        try {
            this.emailService.sendEmail(data.getEmail(), "Password Reset", data.getCode());
        } catch (Exception e) {
            System.out.println("Error sending password reset " + e);
        }
    }
}