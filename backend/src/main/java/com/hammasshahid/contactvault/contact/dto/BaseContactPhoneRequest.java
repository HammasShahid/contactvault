package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseContactPhoneRequest {
    @NotBlank
    private String phoneNumber;

    private String label;
}
