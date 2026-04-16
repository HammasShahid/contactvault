package com.hammasshahid.contactvault.auth.service;

import com.hammasshahid.contactvault.auth.config.JwtConfig;
import com.hammasshahid.contactvault.auth.helper.Jwt;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtConfig jwtConfig;

    public Jwt generateAccessToken(String email) {
        Claims claims = Jwts.claims()
                .subject(email)
                .expiration(new Date(System.currentTimeMillis() + jwtConfig.getAccessTokenExpirationMillis()))
                .issuedAt(new Date())
                .build();

        return new Jwt(claims, jwtConfig.getSecretKey());
    }

    public Jwt parseToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(jwtConfig.getSecretKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            return new Jwt(claims, jwtConfig.getSecretKey());
        } catch (JwtException ex) {
            return null;
        }
    }
}
