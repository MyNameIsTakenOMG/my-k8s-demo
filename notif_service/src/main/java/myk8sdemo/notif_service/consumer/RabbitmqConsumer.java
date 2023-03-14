package myk8sdemo.notif_service.consumer;

import myk8sdemo.notif_service.dto.OrderComplete;
import myk8sdemo.notif_service.service.MailSenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitmqConsumer {
    private final Logger log = LoggerFactory.getLogger(RabbitmqConsumer.class);

    @Autowired
    private MailSenderService mailSenderService;

    @RabbitListener(queues = "order_complete_queue")
    public void consume(OrderComplete orderComplete){
        log.info(String.format("received order complete message from %s",orderComplete.toString()));
        mailSenderService.sendMail(orderComplete.getEmail(),"order complete",String.format("Order %s has been completed",orderComplete.getOrderId()));
        log.info(String.format("user: %s, order: %s, order complete email sent out",orderComplete.getEmail(),orderComplete.getOrderId()));
    }
}
