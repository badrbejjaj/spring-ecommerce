package project.ecom.springshop.domaine.user;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.ecom.springshop.domaine.role.RoleVo;

@Data
@NoArgsConstructor
public class UserVo {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String city;
    private String password;
    private List<RoleVo> roles = new ArrayList<RoleVo>();
    public UserVo(
            String username,
            String firstName,
            String lastName,
            String phone,
            String email,
            String city,
            String password,
            List<RoleVo> roles) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.roles=roles;
    }
}
