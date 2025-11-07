package org.example.axon.service;

import java.util.List;

import org.example.axon.dto.request.UserCreationRequest;
import org.example.axon.dto.request.UserUpdateRequest;
import org.example.axon.exception.AppException;
import org.example.axon.exception.ErrorCode;
import org.example.axon.mapper.UserMapper;
import org.example.axon.model.Users;
import org.example.axon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public Users createRequest(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }

        Users user = userMapper.toUser(request);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public List<Users> getUsers() {
        return userRepository.findAll();
    }

    public Users getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public Users updateUser(String userId, UserUpdateRequest request) {
        Users user = getUserById(userId);
        if (user == null) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        userMapper.updateUser(user, request);
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
