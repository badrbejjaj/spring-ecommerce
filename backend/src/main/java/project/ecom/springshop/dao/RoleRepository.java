package project.ecom.springshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import project.ecom.springshop.model.Role;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    List<Role> findByRole(String role);
    List<Role> findAll();
}