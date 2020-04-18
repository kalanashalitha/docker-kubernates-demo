package demo.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import demo.DuplicateEmailException;
import demo.model.User;
import demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.security.GeneralSecurityException;
import java.util.*;

/**
 * Created by Kalana Shalitha on 10/22/2017.
 */

@RequestMapping("api/user")
@Controller
public class UserController{

    private static final HttpTransport httpTransport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new JacksonFactory();

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET,value ="/create")
    public List<User> createUser() {
        System.out.println("hit");
        User user1 = new User();
        user1.setEmail("fuck@fuck11.com");
        user1.setFirstName("kalana");
        //user1.setId("1");

        User user2 = new User();
        user2.setEmail("fuck@fuck.com");
        user2.setFirstName("shalitha");
        //user2.setId("1");
        List<User> users = new ArrayList(){{add(user1);add(user2);}};
        try{
            List<User> createdUsers = userService.createUsers(users);
            return createdUsers;
        } catch (Exception e){
            System.out.println(e.getMessage());
            throw new DuplicateEmailException("email is duplicated");
        }
    }
    @RequestMapping(method = RequestMethod.POST,value = "/authenticate")
    public ResponseEntity<User> authenticateUser(@RequestBody String idToken) throws GeneralSecurityException, IOException {
        System.out.println("aaaaaaaaaaaaaaaaaaaa"+idToken);
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(httpTransport, jsonFactory)
                .setAudience(Collections.singletonList("968290368770-41286pviqm741nh77i2e7bcvc81p45qd.apps.googleusercontent.com"))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

        // (Receive idTokenString by HTTPS POST)

        GoogleIdToken googleIdToken = verifier.verify(idToken);
        if (googleIdToken != null) {
            GoogleIdToken.Payload payload = googleIdToken.getPayload();

            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            // Use or store profile information
            System.out.println("before"+userId);

            Optional<User> maybeUser = userService.getUser(userId);
            System.out.println(maybeUser);
            if(maybeUser.isPresent()){
                System.out.println("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                return ResponseEntity.ok().body(maybeUser.get());
            } else {
                System.out.println("kkkkkkkkkkkkkkkkkkkkkkkk");
                User user = new User();
                user.setEmail(email);
                user.setFirstName(name);
                user.setId(userId);
                user.setRole(User.Role.ADMIN);
                User createdUser = userService.createUser(user);
                URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest().path(userId)
                        .buildAndExpand(createdUser.getId()).toUri();
                return ResponseEntity.created(location).build();
            }
        } else {
            System.out.println("Invalid ID token.");
            return ResponseEntity.badRequest().build();
        }
    }
}
