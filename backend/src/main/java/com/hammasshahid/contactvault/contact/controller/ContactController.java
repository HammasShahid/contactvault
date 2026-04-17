package com.hammasshahid.contactvault.contact.controller;

import com.hammasshahid.contactvault.contact.dto.ContactRequest;
import com.hammasshahid.contactvault.contact.dto.ContactResponse;
import com.hammasshahid.contactvault.contact.service.ContactService;
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
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactResponse> create(@Valid @RequestBody ContactRequest request, UriComponentsBuilder uriComponentsBuilder) {
        ContactResponse response = contactService.createContact(request);

        URI uri = uriComponentsBuilder.path("/api/v1/contacts/{id}").buildAndExpand(response.getId()).toUri();
        return ResponseEntity.created(uri).body(response);
    }
}
