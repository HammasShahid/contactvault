package com.hammasshahid.contactvault.contact.mapper;

import com.hammasshahid.contactvault.contact.dto.ContactEmailRequest;
import com.hammasshahid.contactvault.contact.dto.ContactPhoneRequest;
import com.hammasshahid.contactvault.contact.dto.ContactRequest;
import com.hammasshahid.contactvault.contact.dto.ContactResponse;
import com.hammasshahid.contactvault.contact.entity.Contact;
import com.hammasshahid.contactvault.contact.entity.ContactEmail;
import com.hammasshahid.contactvault.contact.entity.ContactPhone;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ContactMapper {

    @Mapping(target = "emails", ignore = true)
    @Mapping(target = "phones", ignore = true)
    Contact toEntity(ContactRequest request);

    ContactEmail toEmailEntity(ContactEmailRequest request);

    ContactPhone toPhoneEntity(ContactPhoneRequest request);

    ContactResponse toResponse(Contact contact);
}
