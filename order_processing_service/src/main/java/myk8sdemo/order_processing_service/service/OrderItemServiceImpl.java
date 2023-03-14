package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.OrderItem;
import myk8sdemo.order_processing_service.repository.OrderItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService{

    @Autowired
    private OrderItemRepo orderItemRepo;
    @Override
    public OrderItem saveOrderItem(OrderItem orderItem) {

        return orderItemRepo.save(orderItem);
    }
}
