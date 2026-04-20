package com.hammasshahid.contactvault.contact.mapper;

import com.hammasshahid.contactvault.contact.dto.*;
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

    ContactEmail toEmailEntity(BaseContactEmailRequest request);

    ContactPhone toPhoneEntity(BaseContactPhoneRequest request);

    ContactResponse toResponse(Contact contact);
}
