package project.ecom.springshop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import project.ecom.springshop.domaine.role.RoleVo;
import project.ecom.springshop.domaine.user.UserVo;
import project.ecom.springshop.service.IUserService;

import java.util.Arrays;

@SpringBootApplication
public class SpringshopApplication extends SpringBootServletInitializer implements CommandLineRunner {
    @Autowired
    private IUserService userService;


    public static void main(String[] args) {
        SpringApplication.run(SpringshopApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userService.cleanDataBase();
        userService.save(new RoleVo("ADMIN"));
        userService.save(new RoleVo("CLIENT"));

        RoleVo roleAdmin = userService.getRoleByName("ADMIN");
        RoleVo roleClient = userService.getRoleByName("CLIENT");
        UserVo admin1 = new UserVo(
                "admin",
                "adminFirstName",
                "adminLastName",
                285231654,
                "admin@mail.com",
                "casablanca",
                ":admin" ,
                Arrays.asList(roleAdmin)
        );
        UserVo client1 = new UserVo(
                "client",
                "clientFirstName",
                "clientLastName",
                285231654,
                "client@mail.com",
                "casablanca",
                ":client" ,
                Arrays.asList(roleClient)
        );

        userService.save(admin1);
        userService.save(client1);

    }
}