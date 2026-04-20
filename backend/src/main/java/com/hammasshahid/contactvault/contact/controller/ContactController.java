package com.hammasshahid.contactvault.contact.controller;

import com.hammasshahid.contactvault.contact.dto.CreateContactRequest;
import com.hammasshahid.contactvault.contact.dto.ContactResponse;
import com.hammasshahid.contactvault.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> create(@Valid @RequestBody CreateContactRequest request, UriComponentsBuilder uriComponentsBuilder) {
        ContactResponse response = contactService.createContact(request);

        URI uri = uriComponentsBuilder.path("/api/v1/contacts/{id}").buildAndExpand(response.getId()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping
    public Page<ContactResponse> getAllByCurrentUser(@RequestParam int page, @RequestParam int size) {
        return contactService.getAllByCurrentUser(page, size);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponse> update(@PathVariable("id") Long id, @Valid @RequestBody CreateContactRequest request) {
        return ResponseEntity.ok(contactService.update(id, request));
    }
}
