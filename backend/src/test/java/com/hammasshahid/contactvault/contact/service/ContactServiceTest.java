package com.hammasshahid.contactvault.contact.service;

import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.common.exception.ForbiddenException;
import com.hammasshahid.contactvault.common.exception.NotFoundException;
import com.hammasshahid.contactvault.contact.entity.Contact;
import com.hammasshahid.contactvault.contact.repository.ContactRepository;
import com.hammasshahid.contactvault.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ContactService Unit Tests")
class ContactServiceTest {
    private static final Long TEST_CONTACT_ID = 1L;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private AuthService authService;
    @InjectMocks
    private ContactService contactService;
    private Contact testContact;
    private User testUser;
    private User testOtherUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(10L);
        testUser.setEmail("owneruser@xyz.com");

        testContact = new Contact();
        testContact.setId(TEST_CONTACT_ID);
        testContact.setUser(testUser);

        testOtherUser = new User();
        testOtherUser.setId(20L);
        testOtherUser.setEmail("otheruser@xyz.com");
    }

    @Nested
    @DisplayName("Delete contact tests")
    class DeleteContactTests {
        @Test
        @DisplayName("Should delete a contact by id when current user is owner.")
        void deleteById_shouldDeleteContact_whenUserIsOwner() {
            // Arrange

            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));

            // Act
            contactService.deleteById(TEST_CONTACT_ID);

            // Assert
            verify(contactRepository).delete(testContact);
        }

        @Test
        @DisplayName("Should throw NotFound exception when contact does not exist.")
        void deleteById_shouldThrowNotFound_whenContactDoesNotExist() {
            // Arrange
            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.empty());

            // Act + Assert
            NotFoundException exception = assertThrows(NotFoundException.class, () -> contactService.deleteById(TEST_CONTACT_ID));
            assertEquals("Contact not found", exception.getMessage());

            verify(contactRepository, never()).delete(any());
        }

        @Test
        @DisplayName("Should throw Forbidden exception when user is not the owner.")
        void deleteById_shouldThrowForbidden_whenUserNotOwner() {
            // Arrange
            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testOtherUser);

            // Act + Assert
            ForbiddenException exception = assertThrows(ForbiddenException.class, () -> contactService.deleteById(TEST_CONTACT_ID));
            assertEquals("You don't have permission to perform this action.", exception.getMessage());

            verify(contactRepository, never()).delete(any());
        }
    }
}