//package myk8sdemo.order_processing_service.controller;
//
//import myk8sdemo.order_processing_service.dto.OrderCompleteInfo;
//import myk8sdemo.order_processing_service.dto.OrderInfo;
//import myk8sdemo.order_processing_service.dto.ProductInfo;
//import myk8sdemo.order_processing_service.dto.UserInfo;
//import myk8sdemo.order_processing_service.entity.OrderItem;
//import myk8sdemo.order_processing_service.entity.Orders;
//import myk8sdemo.order_processing_service.entity.Product;
//import myk8sdemo.order_processing_service.entity.User;
//import myk8sdemo.order_processing_service.repository.UserRepo;
//import myk8sdemo.order_processing_service.service.OrderItemServiceImpl;
//import myk8sdemo.order_processing_service.service.OrdersServiceImpl;
//import myk8sdemo.order_processing_service.service.ProductServiceImpl;
//import myk8sdemo.order_processing_service.service.UserServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api")
//public class TestController {
//    @Autowired
//    private OrdersServiceImpl ordersServiceImpl;
//    @Autowired
//    private OrderItemServiceImpl orderItemServiceImpl;
//    @Autowired
//    private UserServiceImpl userServiceImpl;
//    @Autowired
//    private ProductServiceImpl productServiceImpl;
//    @Autowired
//    private UserRepo userRepo;
//
//    @PostMapping("/add_order")
//    public OrderCompleteInfo addOrder(@RequestBody OrderInfo orderInfo){
//        //find the user who made the order and create a new order
//        User theUser =userServiceImpl.findUserById(orderInfo.getUserId()).get();
//        Orders newOrder = new Orders();
//        newOrder.setUser(theUser);
//        Orders responseOrder = ordersServiceImpl.saveOrder(newOrder);
//        //find the product and modify the quantity in stock first,
//        //then create a new orderItem
//        int response = productServiceImpl.updateProductQuantityById(orderInfo.getQuantity(),orderInfo.getProductId());
//        Product theProduct = productServiceImpl.findProductById(orderInfo.getProductId()).get();
//        OrderItem newOrderItem = new OrderItem();
//        newOrderItem.setQuantity(orderInfo.getQuantity());
//        newOrderItem.setOrders(responseOrder);
//        newOrderItem.setProduct(theProduct);
//        OrderItem responseOrderItem = orderItemServiceImpl.saveOrderItem(newOrderItem);
//        return new OrderCompleteInfo(responseOrder.getId(),orderInfo.getEmail());
//    }
//    @PostMapping("/add_user")
//    public String addUser(@RequestBody UserInfo userInfo){
//        User newUser = User.builder()
//                .firstName(userInfo.getFirstName())
//                .lastName(userInfo.getLastName())
//                .email(userInfo.getEmail())
//                .password(userInfo.getPassword())
//                .role(userInfo.getRole())
//                .build();
//        User responseUser =  userServiceImpl.saveUser(newUser);
//
//        return "new user created";
//    }
//
//    @PostMapping("/add_product")
//    public String addProduct(@RequestBody ProductInfo productInfo){
//        Product newProduct = Product.builder()
//                .name(productInfo.getName())
//                .quantityInStock(productInfo.getQuantityInStock())
//                .price(productInfo.getPrice())
//                .build();
//        Product responseProduct = productServiceImpl.saveProduct(newProduct);
//        return "new product created";
//    }
//}
