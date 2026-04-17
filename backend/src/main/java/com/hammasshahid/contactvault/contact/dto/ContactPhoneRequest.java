package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactPhoneRequest {
    @NotBlank
    private String phoneNumber;

    private String label;
}
