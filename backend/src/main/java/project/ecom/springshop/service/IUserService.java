package project.ecom.springshop.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import project.ecom.springshop.domaine.role.RoleVo;
import project.ecom.springshop.domaine.user.UserVo;

import java.util.List;

public interface IUserService extends UserDetailsService {
    void save(UserVo user);
    void save(RoleVo role);
    List<UserVo> getAllUsers();
    List<RoleVo> getAllRoles();
    UserVo getUserByUsername(String username);
    RoleVo getRoleByName(String role);
    void cleanDataBase();
    boolean userExistByUsernameOrEmail(String username, String email);
}