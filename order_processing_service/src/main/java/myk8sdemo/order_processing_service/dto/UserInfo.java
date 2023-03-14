package myk8sdemo.order_processing_service.dto;

import lombok.Data;

@Data
public class UserInfo {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
}
