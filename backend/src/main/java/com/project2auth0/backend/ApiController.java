package com.project2auth0.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;  

@RestController
@RequestMapping("/api")
public class ApiController {
    @GetMapping("/hello")
    public String publicHello() {
        return "Hello from the public API!";
    }

    @GetMapping("/protected") 
    public String protectedHello(){
        return "Hello from the protected API! You are authenticated.";
    }
}
