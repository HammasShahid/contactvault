package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContactRequest {

    @NotBlank
    private String firstName;
    private String lastName;
    private String title;

    private List<@Valid ContactEmailRequest> emails;
    private List<@Valid ContactPhoneRequest> phones;
}
