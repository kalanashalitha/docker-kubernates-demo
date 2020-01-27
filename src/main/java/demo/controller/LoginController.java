package demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Kalana Shalitha on 8/7/2017.
 */
@Controller
public class LoginController {

    @RequestMapping(method = RequestMethod.GET, value = "/api")
    public String getLogin(){
        System.out.println("login controller called");
        return "login.html";
    }
    @RequestMapping(method = RequestMethod.GET, value = "/home")
    public String getHome(){
        System.out.println("home called");
        return "index.html";
    }
}
