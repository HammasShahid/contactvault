package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseContactRequest {
    @NotBlank
    private String firstName;
    private String lastName;
    private String title;
}
