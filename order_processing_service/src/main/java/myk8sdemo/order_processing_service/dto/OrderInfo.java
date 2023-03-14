package myk8sdemo.order_processing_service.dto;

import lombok.Data;

@Data
public class OrderInfo {
    private int userId;
    private String email;
    private int productId;
    private int quantity;
}
