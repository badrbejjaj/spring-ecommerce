package project.ecom.springshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.ecom.springshop.dao.RoleRepository;
import project.ecom.springshop.dao.UserRepository;
import project.ecom.springshop.domaine.role.RoleConverter;
import project.ecom.springshop.domaine.role.RoleVo;
import project.ecom.springshop.domaine.user.UserConverter;
import project.ecom.springshop.domaine.user.UserVo;
import project.ecom.springshop.service.model.Role;
import project.ecom.springshop.service.model.User;

import java.util.*;


@Service("userService")
@Transactional
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;
        return new
                org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                enabled,
                accountNonExpired, credentialsNonExpired, accountNonLocked,
                getAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<Role> roles) {
        List<GrantedAuthority> springSecurityAuthorities = new ArrayList<>();
        for (Role r : roles) {
            springSecurityAuthorities.add(new
                    SimpleGrantedAuthority(r.getRole()));
        }
        return springSecurityAuthorities;
    }

    @Override
    public void save(UserVo userVo) {
        User user= UserConverter.toBo(userVo);
        user.setPassword(bCryptPasswordEncoder().encode(user.getPassword()));
        List<Role> rolesPersist = new ArrayList<>();
        RoleVo role = new RoleVo("CLIENT");
        Role userRole = roleRepository.findByRole(role.getRole()).get(0);
        rolesPersist.add(userRole);
        user.setRoles(rolesPersist);
        userRepository.save(user);
    }

    @Override
    public void save(RoleVo roleVo) {
        roleRepository.save(RoleConverter.toBo(roleVo));
    }

    @Override
    public List<UserVo> getAllUsers() {
        return UserConverter.toVoList(userRepository.findAll());
    }

    @Override
    public List<RoleVo> getAllRoles() {
        return RoleConverter.toVoList(roleRepository.findAll());
    }

    @Override
    public RoleVo getRoleByName(String role) {
        return RoleConverter.toVo(roleRepository.findByRole(role).get(0));
    }

    @Override
    public void cleanDataBase() {
        userRepository.deleteAll();
        roleRepository.deleteAll();
    }

    public boolean userExistByUsernameOrEmail(String username, String email) {
        return Objects.isNull(userRepository.findByUsernameOrEmail(username, email));
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
