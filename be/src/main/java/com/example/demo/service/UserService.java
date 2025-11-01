package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.Users;
import com.example.demo.repository.UserRepository;

public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    public Users createRequest(UserCreationRequest request){
        Users user = userMapper.toUser(request);
        return userRepository.save(user);
    }
}
