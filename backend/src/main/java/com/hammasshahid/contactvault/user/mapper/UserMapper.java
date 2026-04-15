package com.hammasshahid.contactvault.user.mapper;

import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import com.hammasshahid.contactvault.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(RegisterRequest request);
    UserResponse toResponse(User user);
}
