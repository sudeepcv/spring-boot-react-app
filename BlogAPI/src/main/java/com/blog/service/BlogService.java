package com.blog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.blog.modal.Blog;
import com.blog.repository.BlogRepository;
import com.blog.repository.UserInfoRepository;

import jakarta.transaction.Transactional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository, UserInfoRepository userInfoRepository) {
        this.blogRepository = blogRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public void addBlog(Blog blog) {

        blogRepository.save(blog);
    }

   
    public Page<Blog> listBlogs(Pageable pageable) {
        // Pageable firstPageWithTwoElements = PageRequest.of(1, 1);
        return blogRepository.findAll(pageable);
    }
}


