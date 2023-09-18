package com.blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
// Import other necessary classes
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.dto.BlogDTO;
import com.blog.modal.Blog;
import com.blog.service.BlogService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/blogs")
public class BlogListingController {

    private final BlogService blogService;
    private final ObjectMapper objectMapper; 

    @Autowired
    public BlogListingController(BlogService blogService, ObjectMapper objectMapper) {
        this.blogService = blogService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<Page<BlogDTO>> listBlogs(Pageable pageable) {
        try {
            Page<Blog> blogs = blogService.listBlogs(pageable);
            
            // Convert Blog objects to BlogDto objects
            Page<BlogDTO> blogDtos = blogs.map(blog -> {
                BlogDTO blogDto = objectMapper.convertValue(blog, BlogDTO.class);
                blogDto.setUsername(blog.getUserInfo().getName()); // Use username instead of ownerUsername
                return blogDto;
            });
            
            return ResponseEntity.ok(blogDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}
