package project.ecom.springshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import project.ecom.springshop.domaine.user.UserVo;
import project.ecom.springshop.service.IUserService;
import project.ecom.springshop.service.model.JwtRequest;
import project.ecom.springshop.configuration.JwtTokenUtil;
import project.ecom.springshop.service.model.JwtResponse;

import java.util.List;

@RestController
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

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = service.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/api/register", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody UserVo userVo) throws Exception {
        boolean userExist = service.userExistByUsernameOrEmail(userVo.getUsername(), userVo.getEmail());

        if(!userExist) {
            return new ResponseEntity<>("Username or email already exist", HttpStatus.BAD_REQUEST);
        }

        service.save(userVo);
        return new ResponseEntity<>("User succefully created", HttpStatus.CREATED);
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

}
