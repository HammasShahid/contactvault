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
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;

    public UserResponse register(RegisterRequest request) {
        log.info("Attempting to register user with email {}", request.getEmail());

        boolean isPresent = userRepository.findByEmail(request.getEmail()).isPresent();

        if (isPresent) {
            log.warn("Registration failed, email {} already exists", request.getEmail());
            throw new BadRequestException("Email already exists");
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        log.info("User registered successfully with email {}", user.getEmail());

        return userMapper.toResponse(user);
    }

    public LoginResponse login(LoginRequest request) {
        log.info("Login attempt for email {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> {
            log.warn("Login failed, no user found with email {}", request.getEmail());
            return new BadRequestException("Incorrect email or password");
        });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Login failed, incorrect password for email {}", request.getEmail());
            throw new BadRequestException("Incorrect email or password");
        }

        Jwt jwt = jwtService.generateAccessToken(request.getEmail());
        log.info("User {} logged in successfully", user.getId());

        return new LoginResponse(jwt.toString());
    }

    public UserResponse me() {
        log.info("Fetching profile for current user");
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (email == null) {
            log.warn("Unauthenticated access attempt to /me");
            throw new UnauthorizedException("User not authenticated");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            log.info("Authenticated principal {} not found in database", email);
            return new NotFoundException("User not found");
        });

        return userMapper.toResponse(user);
    }

    public User getCurrentUser() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (email == null)
            throw new UnauthorizedException("User not authenticated");

        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found."));
    }
}
