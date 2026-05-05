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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {
    private final ContactMapper contactMapper;
    private final ContactRepository contactRepository;
    private final AuthService authService;

    public ContactResponse createContact(CreateContactRequest request) {
        User currentUser = authService.getCurrentUser();
        log.info("Attempting to create contact for user {}", currentUser.getId());

        Contact contact = contactMapper.toEntity(request);
        contact.setUser(currentUser);

        if (request.getEmails() != null) {
            request.getEmails().forEach(e -> {
                ContactEmail email = contactMapper.toEmailEntity(e);
                contact.addEmail(email);
            });
        }
        if (request.getPhones() != null) {
            request.getPhones().forEach(p -> {
                ContactPhone phone = contactMapper.toPhoneEntity(p);
                contact.addPhone(phone);
            });
        }

        contactRepository.save(contact);
        log.info("Contact {} created for user {}", contact.getId(), currentUser.getId());
        return contactMapper.toResponse(contact);
    }

    public Page<ContactResponse> getAllByCurrentUser(int page, int size) {
        User currentUser = authService.getCurrentUser();

        log.info("Fetching contacts for user {}, page={}, size={}", currentUser.getId(), page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Contact> contactPage = contactRepository.findByUser(currentUser, pageable);

        return contactPage.map(contactMapper::toResponse);
    }

    public ContactResponse update(Long id, UpdateContactRequest request) {
        log.info("Attempting to update contact with id {}", id);

        Contact contact = contactRepository.findById(id).orElseThrow(() -> {
            log.warn("Contact with id {} does not exist", id);
            return new NotFoundException("Contact not found.");
        });

        User currentUser = authService.getCurrentUser();
        if (!contact.getUser().getId().equals(currentUser.getId())) {
            log.warn("User {} attempted unauthorized update on contact {}", currentUser.getId(), id);
            throw new ForbiddenException("You don't have permission to perform this action.");
        }
        contact.setTitle(request.getTitle());
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());

        syncEmails(contact, request.getEmails());
        syncPhones(contact, request.getPhones());

        contactRepository.save(contact);

        log.info("Contact with id {} was successfully updated by user {}", id, currentUser.getId());
        return contactMapper.toResponse(contact);
    }

    private void syncEmails(Contact contact, List<UpdateContactEmailRequest> emailRequests) {
        /*
         * UPDATE -> email request contains id
         * ADD -> email request does not contain id
         * DELETE -> email exists in database but is not present in the request
         */

        Map<Long, ContactEmail> existing =
                contact
                        .getEmails()
                        .stream()
                        .collect(Collectors.toMap(ContactEmail::getId, e -> e));

        Set<ContactEmail> updated = new HashSet<>();

        if (emailRequests != null) {
            for (UpdateContactEmailRequest request : emailRequests) {
                // UPDATE existing email
                if (request.getId() != null) {

                    if (!existing.containsKey(request.getId())) {
                        log.warn("Invalid email id {} for contact {}", request.getId(), contact.getId());
                        throw new BadRequestException("Invalid email ID '" + request.getId() + "' for this contact");
                    }
                    ContactEmail email = existing.get(request.getId());
                    email.setEmail(request.getEmail());
                    email.setLabel(request.getLabel());
                    updated.add(email);

                } else {
                    // ADD new email
                    ContactEmail newEmail = contactMapper.toEmailEntity(request);
                    contact.addEmail(newEmail);
                    updated.add(newEmail);
                }
            }
        }

        // DELETE emails (orphanRemoval handles DB)
        contact.getEmails().removeIf(e -> !updated.contains(e));
    }

    private void syncPhones(Contact contact, List<UpdateContactPhoneRequest> phoneRequests) {
        /*
         * UPDATE -> phone request contains id
         * ADD -> phone request does not contain id
         * DELETE -> phone exists in database but is not present in the request
         */

        Map<Long, ContactPhone> existing =
                contact
                        .getPhones()
                        .stream()
                        .collect(Collectors.toMap(ContactPhone::getId, p -> p));

        Set<ContactPhone> updated = new HashSet<>();

        if (phoneRequests != null) {
            for (UpdateContactPhoneRequest request : phoneRequests) {
                // UPDATE existing phone
                if (request.getId() != null) {

                    if (!existing.containsKey(request.getId())) {
                        log.warn("Invalid phone id {} for contact {}", request.getId(), contact.getId());
                        throw new BadRequestException("Invalid phone ID '" + request.getId() + "' for this contact");
                    }
                    ContactPhone phone = existing.get(request.getId());
                    phone.setPhoneNumber(request.getPhoneNumber());
                    phone.setLabel(request.getLabel());
                    updated.add(phone);
                } else {
                    // ADD new phone
                    ContactPhone newPhone = contactMapper.toPhoneEntity(request);
                    contact.addPhone(newPhone);
                    updated.add(newPhone);
                }
            }
        }

        // DELETE phones (orphanRemoval handles DB)
        contact.getPhones().removeIf(e -> !updated.contains(e));
    }

    public void deleteById(Long id) {
        log.info("Attempting to delete contact with id {}", id);

        Contact contact = contactRepository.findById(id).orElseThrow(() -> {
            log.warn("Contact with id {} not found", id);
            return new NotFoundException("Contact not found");
        });
        User user = authService.getCurrentUser();

        if (!contact.getUser().getId().equals(user.getId())) {
            log.warn("User {} attempted unauthorized delete on contact {}", user.getId(), id);
            throw new ForbiddenException("You don't have permission to perform this action.");
        }

        contactRepository.delete(contact);
        log.info("Contact with id {} was successfully deleted by user {}", id, user.getId());
    }

    public ContactResponse getById(Long id) {
        User currentUser = authService.getCurrentUser();

        log.info("Attempting to fetch contact with id {} for user {}", id, currentUser.getId());
        Contact contact = contactRepository.findByIdAndUserId(id, currentUser.getId()).orElseThrow(() -> {
            log.warn("contact with id {} not found for user {}", id, currentUser.getId());
            return new NotFoundException("Contact not found");
        });

        log.info("Successfully fetched contact {} for user {}", id, currentUser.getId());
        return contactMapper.toResponse(contact);
    }
}
