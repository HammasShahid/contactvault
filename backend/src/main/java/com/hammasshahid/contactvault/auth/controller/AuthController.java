package com.hammasshahid.contactvault.auth.controller;

import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
        URI uri = uriComponentsBuilder.buildAndExpand("/api/v1/users/{id}", userResponse.getId()).toUri();

        return ResponseEntity.created(uri).body(userResponse);
    }
}
