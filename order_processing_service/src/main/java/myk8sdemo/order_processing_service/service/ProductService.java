package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.Product;

import java.util.Optional;

public interface ProductService {
    Product saveProduct(Product product);

    Optional<Product> findProductById(int productId);

    int updateProductQuantityById(int quantity,int productId);
}
