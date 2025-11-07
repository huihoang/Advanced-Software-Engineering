package org.example.axon.mapper;

import org.example.axon.dto.request.UserCreationRequest;
import org.example.axon.dto.request.UserUpdateRequest;
import org.example.axon.model.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    Users toUser(UserCreationRequest request);

    @Mapping(target = "userId", ignore = true)
    void updateUser(@MappingTarget Users user, UserUpdateRequest request);
}