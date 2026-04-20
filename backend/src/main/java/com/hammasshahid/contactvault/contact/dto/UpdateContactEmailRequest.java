package com.hammasshahid.contactvault.contact.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateContactEmailRequest extends BaseContactEmailRequest {
    private Long id;
}
