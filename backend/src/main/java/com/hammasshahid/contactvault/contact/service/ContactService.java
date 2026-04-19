package com.hammasshahid.contactvault.contact.service;

import com.hammasshahid.contactvault.auth.service.AuthService;
import com.hammasshahid.contactvault.common.exception.NotFoundException;
import com.hammasshahid.contactvault.common.exception.UnauthorizedException;
import com.hammasshahid.contactvault.contact.dto.ContactRequest;
import com.hammasshahid.contactvault.contact.dto.ContactResponse;
import com.hammasshahid.contactvault.contact.entity.Contact;
import com.hammasshahid.contactvault.contact.entity.ContactEmail;
import com.hammasshahid.contactvault.contact.entity.ContactPhone;
import com.hammasshahid.contactvault.contact.mapper.ContactMapper;
import com.hammasshahid.contactvault.contact.repository.ContactRepository;
import com.hammasshahid.contactvault.user.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {
    private final ContactMapper contactMapper;
    private final ContactRepository contactRepository;
    private final AuthService authService;

    public ContactResponse createContact(ContactRequest request) {
        User currentUser = authService.getCurrentUser();

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
        return contactMapper.toResponse(contact);
    }

    public Page<ContactResponse> getAllByCurrentUser(int page, int size) {
        User currentUser = authService.getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);
        Page<Contact> contactPage = contactRepository.findByUser(currentUser, pageable);

        return contactPage.map(contactMapper::toResponse);
    }

    @Transactional
    public ContactResponse update(Long id, ContactRequest request) {
        Contact contact = contactRepository.findById(id).orElseThrow(() -> new NotFoundException("Contact not found."));
        if (!contact.getUser().getId().equals(authService.getCurrentUser().getId()))
            throw new UnauthorizedException("You are not authorized to perform that action.");
        contact.setTitle(request.getTitle());
        contact.setFirstName(request.getFirstName());
        contact.setLastName(request.getLastName());

        // TODO: Update emails
        // TODO: Update phones

        return contactMapper.toResponse(contact);
    }
}
