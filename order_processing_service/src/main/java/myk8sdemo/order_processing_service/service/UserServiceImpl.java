package myk8sdemo.order_processing_service.service;

import myk8sdemo.order_processing_service.entity.User;
import myk8sdemo.order_processing_service.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepo userRepo;

    @Override
    public User saveUser(User newUser) {
        return userRepo.save(newUser);
    }

    @Override
    public Optional<User> findUserById(int userId) {
        return userRepo.findById(userId);
    }
}
