package com.blog.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.modal.UserInfo;
import com.blog.repository.UserInfoRepository;

@Service
public class UserInfoService implements UserDetailsService {

	@Autowired
	private UserInfoRepository repository;

	@Autowired
	private PasswordEncoder encoder;

	public UserInfo findByUsername(String username){
		 Optional<UserInfo> userDetail = repository.findByName(username);
		 return userDetail.get();

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		System.out.println("=================load==>"+username);

		Optional<UserInfo> userDetail = repository.findByName(username);

		// Converting userDetail to UserDetails
		return userDetail.map(UserInfoDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
	}

	public String addUser(UserInfo userInfo) {
		userInfo.setPassword(encoder.encode(userInfo.getPassword()));
		userInfo.setRoles((userInfo.getRoles() != null && userInfo.getRoles().length() > 0) ? userInfo.getRoles() : "ROLE_USER");

		// userInfo.setRoles(( userInfo.getRoles().length()>0)?userInfo.getRoles():"ROLE_USER");
		repository.save(userInfo);
		return "User Added Successfully";
	}


}
