package com.hammasshahid.contactvault.user.repository.UserRepository;

import com.hammasshahid.contactvault.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
