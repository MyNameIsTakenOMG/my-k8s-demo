package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.OrderItem;

public interface OrderItemService {
    OrderItem saveOrderItem(OrderItem orderItem);
}
