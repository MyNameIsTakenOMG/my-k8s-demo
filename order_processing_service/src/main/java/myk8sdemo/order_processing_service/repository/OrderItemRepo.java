package myk8sdemo.order_processing_service.repository;

import myk8sdemo.order_processing_service.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem,Integer> {
}
