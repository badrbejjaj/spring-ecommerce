package project.ecom.springshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecom.springshop.service.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String userName);
}
