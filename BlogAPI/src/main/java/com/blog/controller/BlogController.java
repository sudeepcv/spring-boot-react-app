package com.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.dto.BlogDTO;
import com.blog.modal.Blog;
import com.blog.modal.UserInfo;
import com.blog.service.BlogService;
import com.blog.service.JwtService;
import com.blog.service.UserInfoService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/admin/blogs")
public class BlogController {

    private final BlogService blogService;
    private final JwtService jwtService;
    private final UserInfoService userInfoService;

    @Autowired
    public BlogController(BlogService blogService, JwtService jwtService, UserInfoService userInfoService) {
        this.blogService = blogService;
        this.jwtService = jwtService;
        this.userInfoService = userInfoService;
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<String> addBlog(@RequestBody BlogDTO blogDTO, HttpServletRequest request) {

     
        try {
            // Extract the user details from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
                return ResponseEntity.badRequest().body("User not authenticated.");
            }

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Create a new Blog instance and set the author (user)
            Blog blog = new Blog();
            blog.setTitle(blogDTO.getTitle());
            blog.setBody(blogDTO.getBody());

            // Assuming you have a method in your user details class to get the user's
            // username
            String username = userDetails.getUsername();
            // UserInfo user = userInfoService.loadUserByUsername(username);
            UserInfo user = userInfoService.findByUsername(username);

            // UserInfo

            if (user == null) {
                return ResponseEntity.badRequest().body("User not found.");
            }

            blog.setUserInfo(user);

            // Save the blog to the database
            blogService.addBlog(blog);

            return ResponseEntity.ok("Blog added successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to add the blog.");
        }
    }
}
