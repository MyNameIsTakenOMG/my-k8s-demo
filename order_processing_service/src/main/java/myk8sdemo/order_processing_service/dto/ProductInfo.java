package myk8sdemo.order_processing_service.dto;

import lombok.Data;

@Data
public class ProductInfo {
    private String name;
    private int quantityInStock;
    private float price;
}
