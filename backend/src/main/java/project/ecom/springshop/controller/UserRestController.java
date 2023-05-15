package project.ecom.springshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import project.ecom.springshop.domaine.ApiResponseVo;
import project.ecom.springshop.domaine.user.UserVo;
import project.ecom.springshop.service.IUserService;
import project.ecom.springshop.model.JwtRequest;
import project.ecom.springshop.configuration.JwtTokenUtil;
import project.ecom.springshop.model.JwtResponse;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserRestController {
    @Autowired
    private IUserService service;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Pour chercher tous les utilsateur
     */
    @GetMapping(value = "/api/users", produces = { MediaType.APPLICATION_JSON_VALUE })
    public List<UserVo> getAll() {
        return service.getAllUsers();
    }

    @RequestMapping(value = "/api/users/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = service.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token) );
    }

    @PostMapping(value = "/api/users/register", produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<Object> createAuthenticationToken(@RequestBody UserVo userVo) throws Exception {
        boolean userExist = service.userExistByUsernameOrEmail(userVo.getUsername(), userVo.getEmail());

        if(!userExist) {
            return new ResponseEntity(new ApiResponseVo("Username or email already exist", 500),  HttpStatus.BAD_REQUEST);
        }

        service.save(userVo);
        return new ResponseEntity<>(new ApiResponseVo("User created", 201), HttpStatus.CREATED);
    }

    /**
     * Pour chercher un utilisateur par son username
     */
    @GetMapping(value = "/api/users/{username}")
    public ResponseEntity<Object> getUserByUsername(@PathVariable(value = "username") String username)
    {
        UserVo userVoFound = service.getUserByUsername(username);
        if (userVoFound == null)
            return new ResponseEntity<>("user doesn't exist", HttpStatus.OK);
        return new ResponseEntity<>(userVoFound, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    /**
     * get Current user
     */
    @GetMapping(value = "/api/users/current")
    public ResponseEntity<Object> getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        UserVo user = service.getUserByUsername(username);
        return new ResponseEntity(user, HttpStatus.OK);
    }
}
