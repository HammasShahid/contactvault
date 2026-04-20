package com.hammasshahid.contactvault.contact.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateContactPhoneRequest extends BaseContactPhoneRequest {
    private Long id;
}
