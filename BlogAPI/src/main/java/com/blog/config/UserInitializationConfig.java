package com.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.blog.modal.UserInfo;
import com.blog.service.UserInfoService;

import jakarta.annotation.PostConstruct;

@Component
public class UserInitializationConfig {

    @Autowired
    private UserInfoService userInfoService;

  
    @PostConstruct
    public void initializeUsers() {

        try {
            userInfoService.loadUserByUsername("user");

        } catch (Exception e) {
            System.out.println("error" + e.getLocalizedMessage());

            // Add a user with ROLE_USER
            UserInfo user = new UserInfo();
            user.setName("user");
            user.setPassword("user");
            user.setRoles("ROLE_USER");
            userInfoService.addUser(user);

            // Add an admin with ROLE_ADMIN
            UserInfo admin = new UserInfo();
            admin.setName("admin");
            admin.setPassword("admin");
            admin.setRoles("ROLE_ADMIN");
            userInfoService.addUser(admin);

              // Add an admin2 with ROLE_ADMIN
            UserInfo admin1 = new UserInfo();
            admin1.setName("admin1");
            admin1.setPassword("admin1");
            admin1.setRoles("ROLE_ADMIN");
            userInfoService.addUser(admin1);

        }

    }

}
