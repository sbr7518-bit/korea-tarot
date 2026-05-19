package com.mistiktarot.domain.user.auth.service;

import com.mistiktarot.domain.user.auth.dto.LoginRequest;
import com.mistiktarot.domain.user.auth.dto.LoginResponse;
import com.mistiktarot.domain.user.auth.dto.SignupRequest;
import com.mistiktarot.domain.user.auth.dto.SignupResponse;
import com.mistiktarot.domain.user.entity.User;
import com.mistiktarot.domain.user.repository.UserRepository;
import com.mistiktarot.global.exception.BusinessException;
import com.mistiktarot.global.exception.ErrorCode;
import com.mistiktarot.global.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public SignupResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATED);
        }
        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .nickname(request.nickname())
                .build();
        userRepository.save(user);
        return SignupResponse.from(user);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (user.isDeleted()) {
            throw new BusinessException(ErrorCode.DELETED_USER);
        }

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }

        String token = jwtProvider.generateToken(user.getEmail());
        return new LoginResponse(token, "Bearer", user.getNickname());
    }
}
