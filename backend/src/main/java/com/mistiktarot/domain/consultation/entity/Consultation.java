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
        this.interpretation = interpretation;
        this.status = ConsultationStatus.COMPLETED;
    }

    public void fail() {
        this.status = ConsultationStatus.FAILED;
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }

    public boolean isOwnedBy(Long usersId) {
        return this.user.getUsersId().equals(usersId);
    }
}
