package project.ecom.springshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecom.springshop.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String userName);
    User findByUsernameOrEmail(String username, String email);
}
