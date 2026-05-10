package com.hammasshahid.contactvault.contact.service;

import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.common.exception.ForbiddenException;
import com.hammasshahid.contactvault.common.exception.NotFoundException;
import com.hammasshahid.contactvault.contact.dto.*;
import com.hammasshahid.contactvault.contact.entity.Contact;
import com.hammasshahid.contactvault.contact.entity.ContactEmail;
import com.hammasshahid.contactvault.contact.entity.ContactPhone;
import com.hammasshahid.contactvault.contact.mapper.ContactMapper;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ContactService Unit Tests")
class ContactServiceTest {
    private static final Long TEST_CONTACT_ID = 1L;
    @Mock
    private ContactRepository contactRepository;
    @Mock
    private AuthService authService;
    @Mock
    private ContactMapper contactMapper;
    @InjectMocks
    private ContactService contactService;

    private Contact testContact;
    private User testUser;
    private User testOtherUser;
    private List<ContactEmail> testEmails;
    private List<ContactPhone> testPhones;
    private ContactResponse testContactResponse;

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

        testEmails = new ArrayList<>();
        ContactEmail testEmail = new ContactEmail();
        testEmail.setId(1L);
        testEmail.setEmail("babar@xyz.com");
        testEmail.setLabel("work");

        testEmails.add(testEmail);
        testContact.addEmail(testEmail);

        testPhones = new ArrayList<>();
        ContactPhone testPhone = new ContactPhone();
        testPhone.setId(1L);
        testPhone.setPhoneNumber("03123456789");
        testPhone.setLabel("personal");

        testPhones.add(testPhone);
        testContact.addPhone(testPhone);

        testContactResponse = new ContactResponse();
        testContactResponse.setId(testContact.getId());
        testContactResponse.setTitle(testContact.getTitle());
        testContactResponse.setFirstName(testContact.getFirstName());
        testContactResponse.setLastName(testContact.getLastName());

        ContactEmailResponse contactEmailResponse = new ContactEmailResponse();
        contactEmailResponse.setId(testEmails.get(0).getId());
        contactEmailResponse.setEmail(testEmails.get(0).getEmail());
        contactEmailResponse.setLabel(testEmails.get(0).getLabel());

        testContactResponse.setEmails(List.of(contactEmailResponse));

        ContactPhoneResponse contactPhoneResponse = new ContactPhoneResponse();
        contactPhoneResponse.setId(testPhones.get(0).getId());
        contactPhoneResponse.setPhoneNumber(testPhones.get(0).getPhoneNumber());
        contactPhoneResponse.setLabel(testPhones.get(0).getLabel());

        testContactResponse.setPhones(List.of(contactPhoneResponse));
    }

    @Nested
    @DisplayName("Create contact tests")
    class CreateContactTests {
        @Test
        @DisplayName("Should create contact successfully")
        void createContact_shouldCreateContactSuccessfully() {

            // Arrange
            when(authService.getCurrentUser()).thenReturn(testUser);

            CreateContactRequest request = new CreateContactRequest();
            request.setFirstName("Babar");
            request.setLastName("Azam");

            CreateContactEmailRequest emailRequest =
                    new CreateContactEmailRequest();

            emailRequest.setEmail("babar@xyz.com");
            emailRequest.setLabel("work");

            CreateContactPhoneRequest phoneRequest =
                    new CreateContactPhoneRequest();

            phoneRequest.setPhoneNumber("03123456789");
            phoneRequest.setLabel("personal");

            request.setEmails(List.of(emailRequest));
            request.setPhones(List.of(phoneRequest));

            when(contactMapper.toEntity(request))
                    .thenReturn(testContact);

            when(contactMapper.toEmailEntity(emailRequest))
                    .thenReturn(testEmails.get(0));

            when(contactMapper.toPhoneEntity(phoneRequest))
                    .thenReturn(testPhones.get(0));

            when(contactRepository.save(testContact))
                    .thenReturn(testContact);

            when(contactMapper.toResponse(testContact))
                    .thenReturn(testContactResponse);

            // Act
            ContactResponse result = contactService.createContact(request);

            // Assert
            assertEquals(testContact.getId(), result.getId());
            assertEquals(testUser, testContact.getUser());

            assertTrue(testContact.getEmails().contains(testEmails.get(0)));
            assertTrue(testContact.getPhones().contains(testPhones.get(0)));

            verify(contactRepository).save(testContact);
            verify(contactMapper).toEntity(request);
            verify(contactMapper).toEmailEntity(emailRequest);
            verify(contactMapper).toPhoneEntity(phoneRequest);
            verify(contactMapper).toResponse(testContact);
        }
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