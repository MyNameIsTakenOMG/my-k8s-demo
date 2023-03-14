package myk8sdemo.order_processing_service.repository;

import myk8sdemo.order_processing_service.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepo extends JpaRepository<Orders,Integer> {
}
