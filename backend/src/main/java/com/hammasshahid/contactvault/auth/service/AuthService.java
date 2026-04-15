package com.hammasshahid.contactvault.auth.service;

import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import com.hammasshahid.contactvault.user.entity.User;
import com.hammasshahid.contactvault.user.mapper.UserMapper;
import com.hammasshahid.contactvault.user.repository.UserRepository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse register(RegisterRequest request) {
        boolean isPresent = userRepository.findByEmail(request.getEmail()).isPresent();

        // TODO: handle in global exception handler
        if (isPresent) throw new RuntimeException("Email already exists");

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return userMapper.toResponse(user);
    }
}
