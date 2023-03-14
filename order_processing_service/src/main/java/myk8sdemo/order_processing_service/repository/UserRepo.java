package myk8sdemo.order_processing_service.repository;

import myk8sdemo.order_processing_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
}
