package com.hammasshahid.contactvault.contact.service;

import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.common.exception.BadRequestException;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    @Nested
    @DisplayName("Get all contacts by current user tests")
    class GetAllByCurrentUserTests {

        @Test
        @DisplayName("Should return paginated contacts for current user")
        void getAllByCurrentUser_shouldReturnPaginatedContacts_whenUserHasContacts() {
            // Arrange
            int page = 0;
            int size = 10;

            Pageable pageable = PageRequest.of(page, size);
            Page<Contact> contactPage = new PageImpl<>(List.of(testContact), pageable, 1);

            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findByUser(testUser, pageable)).thenReturn(contactPage);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            Page<ContactResponse> result = contactService.getAllByCurrentUser(page, size, null);

            // Assert
            assertNotNull(result);
            assertEquals(1, result.getTotalElements());
            assertEquals(testContactResponse, result.getContent().get(0));
            verify(contactRepository).findByUser(testUser, pageable);
            verify(contactRepository, never()).searchByUser(any(), any(), any());
            verify(contactMapper).toResponse(testContact);
        }

        @Test
        @DisplayName("Should return empty page when user has no contacts")
        void getAllByCurrentUser_shouldReturnEmptyPage_whenUserHasNoContacts() {
            // Arrange
            int page = 0;
            int size = 10;

            Pageable pageable = PageRequest.of(page, size);
            Page<Contact> emptyPage = new PageImpl<>(List.of(), pageable, 0);

            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findByUser(testUser, pageable)).thenReturn(emptyPage);

            // Act
            Page<ContactResponse> result = contactService.getAllByCurrentUser(page, size, null);

            // Assert
            assertNotNull(result);
            assertEquals(0, result.getTotalElements());
            assertTrue(result.getContent().isEmpty());
            verify(contactRepository).findByUser(testUser, pageable);
            verify(contactRepository, never()).searchByUser(any(), any(), any());
            verify(contactMapper, never()).toResponse(any());
        }

        @Test
        @DisplayName("Should return correct page when requesting non-first page")
        void getAllByCurrentUser_shouldReturnCorrectPage_whenRequestingNonFirstPage() {
            // Arrange
            int page = 1;
            int size = 5;

            Contact secondContact = new Contact();
            secondContact.setId(2L);
            secondContact.setUser(testUser);

            ContactResponse secondContactResponse = new ContactResponse();
            secondContactResponse.setId(2L);

            Pageable pageable = PageRequest.of(page, size);
            Page<Contact> contactPage = new PageImpl<>(List.of(secondContact), pageable, 6);

            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findByUser(testUser, pageable)).thenReturn(contactPage);
            when(contactMapper.toResponse(secondContact)).thenReturn(secondContactResponse);

            // Act
            Page<ContactResponse> result = contactService.getAllByCurrentUser(page, size, null);

            // Assert
            assertNotNull(result);
            assertEquals(6, result.getTotalElements());
            assertEquals(2, result.getTotalPages());
            assertEquals(1, result.getContent().size());
            assertEquals(2L, result.getContent().get(0).getId());
            verify(contactRepository).findByUser(testUser, pageable);
            verify(contactRepository, never()).searchByUser(any(), any(), any());
        }
    }

    @Nested
    @DisplayName("Get contact by id tests")
    class GetContactByIdTests {

        @Test
        @DisplayName("Should return contact when it exists and belongs to current user")
        void getById_shouldReturnContact_whenContactExistsAndBelongsToCurrentUser() {
            // Arrange
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findByIdAndUserId(TEST_CONTACT_ID, testUser.getId()))
                    .thenReturn(Optional.of(testContact));
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            ContactResponse result = contactService.getById(TEST_CONTACT_ID);

            // Assert
            assertNotNull(result);
            assertEquals(testContact.getId(), result.getId());
            verify(contactRepository).findByIdAndUserId(TEST_CONTACT_ID, testUser.getId());
            verify(contactMapper).toResponse(testContact);
        }

        @Test
        @DisplayName("Should throw NotFoundException when contact does not exist for current user")
        void getById_shouldThrowNotFound_whenContactDoesNotExistForCurrentUser() {
            // Arrange
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.findByIdAndUserId(TEST_CONTACT_ID, testUser.getId()))
                    .thenReturn(Optional.empty());

            // Act + Assert
            NotFoundException exception = assertThrows(NotFoundException.class,
                    () -> contactService.getById(TEST_CONTACT_ID));

            assertEquals("Contact not found", exception.getMessage());
            verify(contactMapper, never()).toResponse(any());
        }
    }


    @Nested
    @DisplayName("Update contact tests")
    class UpdateContactTests {

        private UpdateContactRequest buildUpdateRequest(
                String firstName, String lastName, String title,
                List<UpdateContactEmailRequest> emails,
                List<UpdateContactPhoneRequest> phones) {

            UpdateContactRequest request = new UpdateContactRequest();
            request.setFirstName(firstName);
            request.setLastName(lastName);
            request.setTitle(title);
            request.setEmails(emails);
            request.setPhones(phones);
            return request;
        }

        @Test
        @DisplayName("Should update contact fields successfully when user is owner")
        void update_shouldUpdateContactFields_whenUserIsOwner() {
            // Arrange
            UpdateContactRequest request = buildUpdateRequest(
                    "UpdatedFirst", "UpdatedLast", "Dr.", null, null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactRepository.save(testContact)).thenReturn(testContact);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            ContactResponse result = contactService.update(TEST_CONTACT_ID, request);

            // Assert
            assertEquals("UpdatedFirst", testContact.getFirstName());
            assertEquals("UpdatedLast", testContact.getLastName());
            assertEquals("Dr.", testContact.getTitle());

            assertNotNull(result);
            verify(contactRepository).save(testContact);
            verify(contactMapper).toResponse(testContact);
        }

        @Test
        @DisplayName("Should throw NotFoundException when contact does not exist")
        void update_shouldThrowNotFound_whenContactDoesNotExist() {
            // Arrange
            UpdateContactRequest request = buildUpdateRequest("A", "B", null, null, null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.empty());

            // Act + Assert
            NotFoundException exception = assertThrows(NotFoundException.class,
                    () -> contactService.update(TEST_CONTACT_ID, request));

            assertEquals("Contact not found.", exception.getMessage());

            verify(contactRepository, never()).save(any());
        }

        @Test
        @DisplayName("Should throw ForbiddenException when user is not the owner")
        void update_shouldThrowForbidden_whenUserIsNotOwner() {
            // Arrange
            UpdateContactRequest request = buildUpdateRequest("A", "B", null, null, null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testOtherUser);

            // Act + Assert
            ForbiddenException exception = assertThrows(ForbiddenException.class,
                    () -> contactService.update(TEST_CONTACT_ID, request));

            assertEquals("You don't have permission to perform this action.", exception.getMessage());

            verify(contactRepository, never()).save(any());
        }

        @Test
        @DisplayName("Should update existing email when request contains valid email id")
        void update_shouldUpdateExistingEmail_whenRequestContainsValidEmailId() {
            // Arrange
            UpdateContactEmailRequest emailRequest = new UpdateContactEmailRequest();
            emailRequest.setId(1L);  // matches testEmail id set in setUp()
            emailRequest.setEmail("updated@xyz.com");
            emailRequest.setLabel("personal");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, List.of(emailRequest), null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            ContactEmail updatedEmail = testContact.getEmails().stream()
                    .filter(e -> Objects.equals(e.getId(), 1L))

                    .findFirst()
                    .orElseThrow();

            assertEquals("updated@xyz.com", updatedEmail.getEmail());
            assertEquals("personal", updatedEmail.getLabel());
            verify(contactRepository).save(testContact);
        }

        @Test
        @DisplayName("Should add new email when request email has no id")
        void update_shouldAddNewEmail_whenRequestEmailHasNoId() {
            // Arrange

            // Keep the existing email (id=1L) in the request so it is not deleted
            UpdateContactEmailRequest existingEmailRequest = new UpdateContactEmailRequest();
            existingEmailRequest.setId(1L);
            existingEmailRequest.setEmail("babar@xyz.com");
            existingEmailRequest.setLabel("work");

            UpdateContactEmailRequest newEmailRequest = new UpdateContactEmailRequest();
            newEmailRequest.setId(null);  // no id = new email
            newEmailRequest.setEmail("newmail@xyz.com");
            newEmailRequest.setLabel("work");

            ContactEmail newEmail = new ContactEmail();
            newEmail.setEmail("newmail@xyz.com");
            newEmail.setLabel("work");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, List.of(existingEmailRequest, newEmailRequest), null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toEmailEntity(newEmailRequest)).thenReturn(newEmail);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            int emailCountBefore = testContact.getEmails().size();

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            assertEquals(emailCountBefore + 1, testContact.getEmails().size());
            assertTrue(testContact.getEmails().contains(newEmail));
            verify(contactRepository).save(testContact);
        }

        @Test
        @DisplayName("Should delete email when it is absent from update request")
        void update_shouldDeleteEmail_whenAbsentFromRequest() {
            // Arrange - send empty email list, so existing testEmail gets removed
            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, List.of(), null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            assertTrue(testContact.getEmails().isEmpty());
            verify(contactRepository).save(testContact);
        }

        @Test
        @DisplayName("Should throw BadRequestException when email id does not belong to contact")
        void update_shouldThrowBadRequest_whenEmailIdDoesNotBelongToContact() {
            // Arrange
            UpdateContactEmailRequest emailRequest = new UpdateContactEmailRequest();
            emailRequest.setId(999L);  // invalid id, not in testContact's emails
            emailRequest.setEmail("x@xyz.com");
            emailRequest.setLabel("work");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, List.of(emailRequest), null);

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);

            // Act + Assert
            BadRequestException exception = assertThrows(BadRequestException.class,
                    () -> contactService.update(TEST_CONTACT_ID, request));

            assertEquals("Invalid email ID '999' for this contact", exception.getMessage());

            verify(contactRepository, never()).save(any());
        }

        @Test
        @DisplayName("Should add new phone when request phone has no id")
        void update_shouldAddNewPhone_whenRequestPhoneHasNoId() {
            // Arrange

            // Keep the existing phone (id=1L) in the request so it is not deleted
            UpdateContactPhoneRequest existingPhoneRequest = new UpdateContactPhoneRequest();
            existingPhoneRequest.setId(1L);
            existingPhoneRequest.setPhoneNumber("03123456789");
            existingPhoneRequest.setLabel("personal");

            UpdateContactPhoneRequest newPhoneRequest = new UpdateContactPhoneRequest();
            newPhoneRequest.setId(null);  // no id = new phone
            newPhoneRequest.setPhoneNumber("03001234567");
            newPhoneRequest.setLabel("home");

            ContactPhone newPhone = new ContactPhone();
            newPhone.setPhoneNumber("03001234567");
            newPhone.setLabel("home");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, null, List.of(existingPhoneRequest, newPhoneRequest));

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toPhoneEntity(newPhoneRequest)).thenReturn(newPhone);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            int phoneCountBefore = testContact.getPhones().size();

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            assertEquals(phoneCountBefore + 1, testContact.getPhones().size());
            assertTrue(testContact.getPhones().contains(newPhone));
            verify(contactRepository).save(testContact);
        }


        @Test
        @DisplayName("Should delete phone when it is absent from update request")
        void update_shouldDeletePhone_whenAbsentFromRequest() {
            // Arrange - send empty phone list, so existing testPhone gets removed
            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, null, List.of());

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            assertTrue(testContact.getPhones().isEmpty());
            verify(contactRepository).save(testContact);
        }

        @Test
        @DisplayName("Should update existing phone when request contains valid phone id")
        void update_shouldUpdateExistingPhone_whenRequestContainsValidPhoneId() {
            // Arrange
            UpdateContactPhoneRequest phoneRequest = new UpdateContactPhoneRequest();
            phoneRequest.setId(1L);  // matches testPhone id set in setUp()
            phoneRequest.setPhoneNumber("03001234567");
            phoneRequest.setLabel("home");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, null, List.of(phoneRequest));

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);
            when(contactMapper.toResponse(testContact)).thenReturn(testContactResponse);

            // Act
            contactService.update(TEST_CONTACT_ID, request);

            // Assert
            ContactPhone updatedPhone = testContact.getPhones().stream()
                    .filter(p -> p.getId().equals(1L))
                    .findFirst()
                    .orElseThrow();

            assertEquals("03001234567", updatedPhone.getPhoneNumber());
            assertEquals("home", updatedPhone.getLabel());
            verify(contactRepository).save(testContact);
        }

        @Test
        @DisplayName("Should throw BadRequestException when phone id does not belong to contact")
        void update_shouldThrowBadRequest_whenPhoneIdDoesNotBelongToContact() {
            // Arrange
            UpdateContactPhoneRequest phoneRequest = new UpdateContactPhoneRequest();
            phoneRequest.setId(999L);  // invalid id
            phoneRequest.setPhoneNumber("03001234567");
            phoneRequest.setLabel("home");

            UpdateContactRequest request = buildUpdateRequest(
                    "Babar", "Azam", null, null, List.of(phoneRequest));

            when(contactRepository.findById(TEST_CONTACT_ID)).thenReturn(Optional.of(testContact));
            when(authService.getCurrentUser()).thenReturn(testUser);

            // Act + Assert
            BadRequestException exception = assertThrows(BadRequestException.class,
                    () -> contactService.update(TEST_CONTACT_ID, request));

            assertEquals("Invalid phone ID '999' for this contact", exception.getMessage());

            verify(contactRepository, never()).save(any());
        }
    }
}