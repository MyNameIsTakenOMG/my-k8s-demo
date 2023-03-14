package myk8sdemo.notif_service.dto;

import lombok.Data;

@Data
public class OrderComplete {
    private String email;
    private int orderId;
}
