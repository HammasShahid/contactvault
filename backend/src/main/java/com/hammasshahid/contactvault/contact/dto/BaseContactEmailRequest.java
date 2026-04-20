package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseContactEmailRequest {
    @Email
    @NotBlank
    private String email;

    private String label;
}
