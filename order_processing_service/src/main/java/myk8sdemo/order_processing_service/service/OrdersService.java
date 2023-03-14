package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.Orders;

public interface OrdersService {
    Orders saveOrder(Orders order);
}
