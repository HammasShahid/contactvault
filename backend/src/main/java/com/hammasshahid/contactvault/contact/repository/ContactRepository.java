package com.hammasshahid.contactvault.contact.repository;

import com.hammasshahid.contactvault.contact.entity.Contact;
import com.hammasshahid.contactvault.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    @EntityGraph(attributePaths = {"emails", "phones"})
    Page<Contact> findByUser(@Param("user") User user, Pageable pageable);
}
