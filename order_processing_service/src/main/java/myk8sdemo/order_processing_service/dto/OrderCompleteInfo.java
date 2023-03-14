package myk8sdemo.order_processing_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderCompleteInfo {
    private int orderId;
    private String email;
}
