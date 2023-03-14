package myk8sdemo.order_processing_service.consumer;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import myk8sdemo.order_processing_service.dto.OrderCompleteInfo;
import myk8sdemo.order_processing_service.dto.OrderInfo;
import myk8sdemo.order_processing_service.entity.OrderItem;
import myk8sdemo.order_processing_service.entity.Orders;
import myk8sdemo.order_processing_service.entity.Product;
import myk8sdemo.order_processing_service.entity.User;
import myk8sdemo.order_processing_service.producer.RabbitProducer;
import myk8sdemo.order_processing_service.service.OrderItemServiceImpl;
import myk8sdemo.order_processing_service.service.OrdersServiceImpl;
import myk8sdemo.order_processing_service.service.ProductServiceImpl;
import myk8sdemo.order_processing_service.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitConsumer {
    @Autowired
    private RabbitProducer rabbitProducer;
    private final Logger log = LoggerFactory.getLogger(RabbitConsumer.class);
    @Autowired
    private OrdersServiceImpl ordersServiceImpl;
    @Autowired
    private UserServiceImpl userServiceImpl;
    @Autowired
    private ProductServiceImpl productServiceImpl;
    @Autowired
    private OrderItemServiceImpl orderItemServiceImpl;
    @RabbitListener(queues = "ordering_queue")
    public void consumeOrdering(OrderInfo orderInfo){

        log.info(String.format("Received message -> %s",orderInfo.toString()));
        //find the user who made the order and create a new order
        User theUser =userServiceImpl.findUserById(orderInfo.getUserId()).get();
        log.info(String.format("the user found is %s",theUser));
        Orders newOrder = new Orders();
        newOrder.setUser(theUser);
        Orders responseOrder = ordersServiceImpl.saveOrder(newOrder);
        log.info("order has been added");
        //find the product and modify the quantity in stock first,
        //then create a new orderItem
        int response = productServiceImpl.updateProductQuantityById(orderInfo.getQuantity(),orderInfo.getProductId());
        Product theProduct = productServiceImpl.findProductById(orderInfo.getProductId()).get();
        OrderItem newOrderItem = new OrderItem();
        newOrderItem.setQuantity(orderInfo.getQuantity());
        newOrderItem.setOrders(responseOrder);
        newOrderItem.setProduct(theProduct);
        OrderItem responseOrderItem = orderItemServiceImpl.saveOrderItem(newOrderItem);
        log.info("order item has been added");
        // send a message to 'order_complete_queue'
        rabbitProducer.sendJsonMessage(new OrderCompleteInfo(responseOrder.getId(),orderInfo.getEmail()));
    }
}
