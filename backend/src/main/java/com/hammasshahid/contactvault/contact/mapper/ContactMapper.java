package com.hammasshahid.contactvault.contact.mapper;

import com.hammasshahid.contactvault.contact.dto.CreateContactEmailRequest;
import com.hammasshahid.contactvault.contact.dto.CreateContactPhoneRequest;
import com.hammasshahid.contactvault.contact.dto.CreateContactRequest;
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
    Contact toEntity(CreateContactRequest request);

    ContactEmail toEmailEntity(CreateContactEmailRequest request);

    ContactPhone toPhoneEntity(CreateContactPhoneRequest request);

    ContactResponse toResponse(Contact contact);
}
