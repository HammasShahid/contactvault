package com.hammasshahid.contactvault.contact.repository;

import com.hammasshahid.contactvault.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
