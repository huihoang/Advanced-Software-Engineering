package com.example.demo.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.demo.model.Users;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.request.UserUpdateRequest;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    Users toUser(UserCreationRequest request);
    
    @Mapping(target = "userId", ignore = true)
    void updateUser(@MappingTarget Users user, UserUpdateRequest request);
}
