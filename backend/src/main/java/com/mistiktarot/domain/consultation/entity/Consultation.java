package com.mistiktarot.domain.consultation.entity;

import com.mistiktarot.domain.user.entity.User;
import com.mistiktarot.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "consultations")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Consultation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consultationsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String concern;

    @Column(columnDefinition = "TEXT")
    private String interpretation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ConsultationStatus status;

    private LocalDateTime deletedAt;

    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL)
    private List<ConsultationCard> consultationCards = new ArrayList<>();

    @Builder
    public Consultation(User user, String concern) {
        this.user = user;
        this.concern = concern;
        this.status = ConsultationStatus.PENDING;
    }

    public void complete(String interpretation) {
        ensurePending();
        this.interpretation = interpretation;
        this.status = ConsultationStatus.COMPLETED;
    }

    public void fail() {
        ensurePending();
        this.status = ConsultationStatus.FAILED;
    }

    private void ensurePending() {
        if (this.status != ConsultationStatus.PENDING) {
            throw new IllegalStateException(
                "상태 전이 불가: 현재 상태 " + this.status + " (PENDING 상태에서만 변경 가능)");
        }
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }

    public boolean isOwnedBy(Long usersId) {
        return this.user != null && Objects.equals(this.user.getUsersId(), usersId);
    }
}
