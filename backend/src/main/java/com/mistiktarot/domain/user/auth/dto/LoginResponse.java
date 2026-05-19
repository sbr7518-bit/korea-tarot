package com.mistiktarot.domain.user.auth.dto;

public record LoginResponse(
        String accessToken,
        String tokenType,
        String nickname
) {}
