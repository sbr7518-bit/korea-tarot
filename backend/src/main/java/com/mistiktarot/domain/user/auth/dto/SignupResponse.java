package com.mistiktarot.domain.user.auth.dto;

import com.mistiktarot.domain.user.entity.User;

import java.time.LocalDateTime;

public record SignupResponse(
        Long userId,
        String email,
        String nickname,
        LocalDateTime createdAt
) {
    public static SignupResponse from(User user) {
        return new SignupResponse(
                user.getUsersId(),
                user.getEmail(),
                user.getNickname(),
                user.getCreatedAt()
        );
    }
}
