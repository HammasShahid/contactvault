package com.hammasshahid.contactvault.contact.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateContactRequest extends BaseContactRequest {
    private List<@Valid CreateContactEmailRequest> emails;
    private List<@Valid CreateContactPhoneRequest> phones;
}
