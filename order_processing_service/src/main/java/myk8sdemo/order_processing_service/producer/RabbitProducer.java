package myk8sdemo.order_processing_service.producer;

import myk8sdemo.order_processing_service.dto.OrderCompleteInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitProducer {

    private final Logger log = LoggerFactory.getLogger(RabbitProducer.class);
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendJsonMessage(OrderCompleteInfo orderCompleteInfo){
        log.info(String.format("order complete info: %s",orderCompleteInfo));
        rabbitTemplate.convertAndSend("order_complete_exchange","order_complete",orderCompleteInfo);
    }
}
