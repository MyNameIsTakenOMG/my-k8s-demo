package myk8sdemo.order_processing_service.service;

import jakarta.transaction.Transactional;
import myk8sdemo.order_processing_service.entity.Product;
import myk8sdemo.order_processing_service.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepo productRepo;
    @Override
    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Optional<Product> findProductById(int productId) {
        return productRepo.findById(productId);
    }

    @Transactional
    @Override
    public int updateProductQuantityById(int quantity,int productId) {
        return productRepo.updateProductQuantityInStock(quantity,productId);
    }
}
