package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateContactRequest extends BaseContactRequest {
    private List<@Valid UpdateContactEmailRequest> emails;
    private List<@Valid UpdateContactPhoneRequest> phones;
}
