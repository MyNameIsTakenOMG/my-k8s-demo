package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.Orders;
import myk8sdemo.order_processing_service.repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepo orderRepo;

    @Override
    public Orders saveOrder(Orders order) {

        return orderRepo.save(order);
    }
}
