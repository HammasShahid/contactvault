package com.hammasshahid.contactvault.auth.controller;

import com.hammasshahid.contactvault.auth.dto.LoginRequest;
import com.hammasshahid.contactvault.auth.dto.LoginResponse;
import com.hammasshahid.contactvault.auth.dto.ChangePasswordRequest;
import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request, UriComponentsBuilder uriComponentsBuilder) {
        UserResponse userResponse = authService.register(request);
        URI uri = uriComponentsBuilder.path("/api/v1/users/{id}").buildAndExpand(userResponse.getId()).toUri();

        return ResponseEntity.created(uri).body(userResponse);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse me() {
        return authService.me();
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.noContent().build();
    }
}
