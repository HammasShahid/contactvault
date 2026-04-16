package com.hammasshahid.contactvault.auth.config;

import io.jsonwebtoken.security.Keys;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Data
@Configuration
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtConfig {
    private String secret;
    private int accessTokenExpirationMillis;

    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}
