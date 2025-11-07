package com.example.axon.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.axon.dto.request.UserCreationRequest;
import com.example.axon.dto.request.UserUpdateRequest;
import com.example.axon.model.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    Users toUser(UserCreationRequest request);

    @Mapping(target = "userId", ignore = true)
    void updateUser(@MappingTarget Users user, UserUpdateRequest request);
}