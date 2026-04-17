package com.hammasshahid.contactvault.auth.service;

import com.hammasshahid.contactvault.auth.dto.LoginRequest;
import com.hammasshahid.contactvault.auth.dto.LoginResponse;
import com.hammasshahid.contactvault.auth.helper.Jwt;
import com.hammasshahid.contactvault.common.exception.BadRequestException;
import com.hammasshahid.contactvault.common.exception.NotFoundException;
import com.hammasshahid.contactvault.common.exception.UnauthorizedException;
import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import com.hammasshahid.contactvault.user.entity.User;
import com.hammasshahid.contactvault.user.mapper.UserMapper;
import com.hammasshahid.contactvault.user.repository.UserRepository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public UserResponse register(RegisterRequest request) {
        boolean isPresent = userRepository.findByEmail(request.getEmail()).isPresent();

        if (isPresent)
            throw new BadRequestException("Email already exists");

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return userMapper.toResponse(user);
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new BadRequestException("Incorrect email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new BadRequestException("Incorrect email or password");

        Jwt jwt = jwtService.generateAccessToken(request.getEmail());

        return new LoginResponse(jwt.toString());
    }

    public UserResponse me() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (email == null)
            throw new UnauthorizedException("User not authenticated");

        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found"));

        return userMapper.toResponse(user);
    }

    public User getCurrentUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (email == null)
            throw new UnauthorizedException("User not authenticated");

        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found."));
    }
}
