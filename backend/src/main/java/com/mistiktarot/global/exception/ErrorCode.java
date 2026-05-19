package com.mistiktarot.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    // Auth
    EMAIL_DUPLICATED(400, "이미 사용 중인 이메일입니다"),
    USER_NOT_FOUND(401, "이메일 또는 비밀번호를 확인해주세요"),
    INVALID_PASSWORD(401, "이메일 또는 비밀번호를 확인해주세요"),
    DELETED_USER(401, "탈퇴한 계정입니다"),
    UNAUTHORIZED(401, "로그인이 필요합니다"),

    // Authorization
    FORBIDDEN(403, "접근 권한이 없습니다"),

    // Resource
    CARD_NOT_FOUND(404, "존재하지 않는 카드입니다"),
    CONSULTATION_NOT_FOUND(404, "존재하지 않는 상담입니다"),

    // Consultation
    INVALID_CARD_COUNT(400, "타로 카드를 3장 선택해주세요"),
    DUPLICATE_CARD(400, "같은 카드를 중복 선택할 수 없습니다"),

    // AI
    AI_SERVER_ERROR(500, "해석 생성에 실패했습니다. 다시 시도해주세요");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
