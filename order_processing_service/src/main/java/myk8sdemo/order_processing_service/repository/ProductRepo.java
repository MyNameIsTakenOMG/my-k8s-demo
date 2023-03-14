package myk8sdemo.order_processing_service.repository;

import myk8sdemo.order_processing_service.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepo extends JpaRepository<Product,Integer> {
    @Modifying
    @Query(nativeQuery = true,
    value = "update product p set p.quantity_in_stock = p.quantity_in_stock - ? where p.id = ?")
    int updateProductQuantityInStock(Integer quantity,Integer productId);
}
