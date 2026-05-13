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
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

    @Nested
    @DisplayName("Register tests")
    class RegisterTests {

        @Test
        @DisplayName("Should register user successfully when email does not exist")
        void register_shouldRegisterUser_whenEmailDoesNotExist() {
            // Arrange
            when(userRepository.findByEmail(testRegisterRequest.getEmail()))
                    .thenReturn(Optional.empty());
            when(userMapper.toEntity(testRegisterRequest)).thenReturn(testUser);
            when(passwordEncoder.encode(testRegisterRequest.getPassword()))
                    .thenReturn("encodedPassword");
            when(userRepository.save(testUser)).thenReturn(testUser);
            when(userMapper.toResponse(testUser)).thenReturn(testUserResponse);

            // Act
            UserResponse result = authService.register(testRegisterRequest);

            // Assert
            assertNotNull(result);
            assertEquals(testUser.getId(), result.getId());
            assertEquals(testUser.getEmail(), result.getEmail());
            assertEquals("encodedPassword", testUser.getPassword());
            verify(passwordEncoder).encode(testRegisterRequest.getPassword());
            verify(userRepository).save(testUser);
            verify(userMapper).toResponse(testUser);
        }

        @Test
        @DisplayName("Should throw BadRequestException when email already exists")
        void register_shouldThrowBadRequest_whenEmailAlreadyExists() {
            // Arrange
            when(userRepository.findByEmail(testRegisterRequest.getEmail()))
                    .thenReturn(Optional.of(testUser));

            // Act + Assert
            BadRequestException exception = assertThrows(BadRequestException.class,
                    () -> authService.register(testRegisterRequest));

            assertEquals("Email already exists", exception.getMessage());
            verify(userRepository, never()).save(any());
            verify(userMapper, never()).toResponse(any());
        }

        @Test
        @DisplayName("Should encode password before saving user")
        void register_shouldEncodePassword_beforeSavingUser() {
            // Arrange
            when(userRepository.findByEmail(testRegisterRequest.getEmail()))
                    .thenReturn(Optional.empty());
            when(userMapper.toEntity(testRegisterRequest)).thenReturn(testUser);
            when(passwordEncoder.encode(testRegisterRequest.getPassword()))
                    .thenReturn("encodedPassword");
            when(userMapper.toResponse(testUser)).thenReturn(testUserResponse);

            // Act
            authService.register(testRegisterRequest);

            // Assert
            InOrder inOrder = inOrder(passwordEncoder, userRepository);
            inOrder.verify(passwordEncoder).encode(testRegisterRequest.getPassword());
            inOrder.verify(userRepository).save(testUser);
        }
    }

    @Nested
    @DisplayName("Login tests")
    class LoginTests {

        @Test
        @DisplayName("Should return token when credentials are correct")
        void login_shouldReturnToken_whenCredentialsAreCorrect() {
            // Arrange
            Jwt mockJwt = mock(Jwt.class);
            when(mockJwt.toString()).thenReturn("mocked.jwt.token");

            when(userRepository.findByEmail(testLoginRequest.getEmail()))
                    .thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches(testLoginRequest.getPassword(), testUser.getPassword()))
                    .thenReturn(true);
            when(jwtService.generateAccessToken(testLoginRequest.getEmail()))
                    .thenReturn(mockJwt);

            // Act
            LoginResponse result = authService.login(testLoginRequest);

            // Assert
            assertNotNull(result);
            assertEquals("mocked.jwt.token", result.token);
            verify(jwtService).generateAccessToken(testLoginRequest.getEmail());
        }

        @Test
        @DisplayName("Should throw BadRequestException when email does not exist")
        void login_shouldThrowBadRequest_whenEmailDoesNotExist() {
            // Arrange
            when(userRepository.findByEmail(testLoginRequest.getEmail()))
                    .thenReturn(Optional.empty());

            // Act + Assert
            BadRequestException exception = assertThrows(BadRequestException.class,
                    () -> authService.login(testLoginRequest));

            assertEquals("Incorrect email or password", exception.getMessage());
            verify(jwtService, never()).generateAccessToken(any());
        }

        @Test
        @DisplayName("Should throw BadRequestException when password is incorrect")
        void login_shouldThrowBadRequest_whenPasswordIsIncorrect() {
            // Arrange
            when(userRepository.findByEmail(testLoginRequest.getEmail()))
                    .thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches(testLoginRequest.getPassword(), testUser.getPassword()))
                    .thenReturn(false);

            // Act + Assert
            BadRequestException exception = assertThrows(BadRequestException.class,
                    () -> authService.login(testLoginRequest));

            assertEquals("Incorrect email or password", exception.getMessage());
            verify(jwtService, never()).generateAccessToken(any());
        }
    }

    @Nested
    @DisplayName("GetCurrentUser tests")
    class GetCurrentUserTests {

        @Test
        @DisplayName("Should return User entity when authenticated")
        void getCurrentUser_shouldReturnUser_whenAuthenticated() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(testUser.getEmail());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            when(userRepository.findByEmail(testUser.getEmail()))
                    .thenReturn(Optional.of(testUser));

            // Act
            User result = authService.getCurrentUser();

            // Assert
            assertNotNull(result);
            assertEquals(testUser.getEmail(), result.getEmail());
            assertEquals(testUser.getId(), result.getId());
            verify(userRepository).findByEmail(testUser.getEmail());
        }

        @Test
        @DisplayName("Should throw UnauthorizedException when principal is null")
        void getCurrentUser_shouldThrowUnauthorized_whenPrincipalIsNull() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(null);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Act + Assert
            UnauthorizedException exception = assertThrows(UnauthorizedException.class,
                    () -> authService.getCurrentUser());

            assertEquals("User not authenticated", exception.getMessage());
            verify(userRepository, never()).findByEmail(any());
        }

        @Test
        @DisplayName("Should throw NotFoundException when user does not exist in database")
        void getCurrentUser_shouldThrowNotFound_whenUserDoesNotExistInDatabase() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(testUser.getEmail());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            when(userRepository.findByEmail(testUser.getEmail()))
                    .thenReturn(Optional.empty());

            // Act + Assert
            NotFoundException exception = assertThrows(NotFoundException.class,
                    () -> authService.getCurrentUser());

            assertEquals("User not found.", exception.getMessage());
            verify(userRepository).findByEmail(testUser.getEmail());
        }

        @AfterEach
        void clearSecurityContext() {
            SecurityContextHolder.clearContext();
        }
    }

    @Nested
    @DisplayName("Me tests")
    class MeTests {

        @Test
        @DisplayName("Should return current user when authenticated")
        void me_shouldReturnCurrentUser_whenAuthenticated() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(testUser.getEmail());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            when(userRepository.findByEmail(testUser.getEmail()))
                    .thenReturn(Optional.of(testUser));
            when(userMapper.toResponse(testUser)).thenReturn(testUserResponse);

            // Act
            UserResponse result = authService.me();

            // Assert
            assertNotNull(result);
            assertEquals(testUser.getEmail(), result.getEmail());
            verify(userRepository).findByEmail(testUser.getEmail());
            verify(userMapper).toResponse(testUser);
        }

        @Test
        @DisplayName("Should throw UnauthorizedException when principal is null")
        void me_shouldThrowUnauthorized_whenPrincipalIsNull() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(null);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Act + Assert
            UnauthorizedException exception = assertThrows(UnauthorizedException.class,
                    () -> authService.me());

            assertEquals("User not authenticated", exception.getMessage());
            verify(userRepository, never()).findByEmail(any());
        }

        @Test
        @DisplayName("Should throw NotFoundException when user does not exist in database")
        void me_shouldThrowNotFound_whenUserDoesNotExistInDatabase() {
            // Arrange
            Authentication authentication = mock(Authentication.class);
            when(authentication.getPrincipal()).thenReturn(testUser.getEmail());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            when(userRepository.findByEmail(testUser.getEmail()))
                    .thenReturn(Optional.empty());

            // Act + Assert
            NotFoundException exception = assertThrows(NotFoundException.class,
                    () -> authService.me());

            assertEquals("User not found", exception.getMessage());
            verify(userMapper, never()).toResponse(any());
        }

        @AfterEach
        void clearSecurityContext() {
            SecurityContextHolder.clearContext();
        }
    }
}