package com.hammasshahid.contactvault.auth.service;

import com.hammasshahid.contactvault.auth.dto.LoginRequest;
import com.hammasshahid.contactvault.user.dto.RegisterRequest;
import com.hammasshahid.contactvault.user.dto.UserResponse;
import com.hammasshahid.contactvault.user.entity.User;
import com.hammasshahid.contactvault.user.mapper.UserMapper;
import com.hammasshahid.contactvault.user.repository.UserRepository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService Unit Tests")
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserMapper userMapper;
    @Mock
    private JwtService jwtService;
    @InjectMocks
    private AuthService authService;

    private User testUser;
    private UserResponse testUserResponse;
    private RegisterRequest testRegisterRequest;
    private LoginRequest testLoginRequest;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("babar@xyz.com");
        testUser.setPassword("encodedPassword");
        testUser.setFirstName("Babar");
        testUser.setLastName("Azam");

        testUserResponse = new UserResponse();
        testUserResponse.setId(testUser.getId());
        testUserResponse.setEmail(testUser.getEmail());
        testUserResponse.setFirstName(testUser.getFirstName());
        testUserResponse.setLastName(testUser.getLastName());

        testRegisterRequest = new RegisterRequest();
        testRegisterRequest.setFirstName("Babar");
        testRegisterRequest.setLastName("Azam");
        testRegisterRequest.setEmail("babar@xyz.com");
        testRegisterRequest.setPassword("password123");

        testLoginRequest = new LoginRequest();
        testLoginRequest.setEmail("babar@xyz.com");
        testLoginRequest.setPassword("password123");
    }
}