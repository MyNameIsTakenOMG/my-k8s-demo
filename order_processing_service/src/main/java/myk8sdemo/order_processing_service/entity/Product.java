package myk8sdemo.order_processing_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private Integer quantityInStock;

    @Column(columnDefinition = "decimal(6,2)")
    private Float price;

    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;
}
