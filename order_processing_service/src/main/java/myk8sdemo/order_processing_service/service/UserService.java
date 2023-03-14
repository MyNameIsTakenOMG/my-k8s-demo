package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User newUser);
    Optional<User> findUserById(int userId);
}
