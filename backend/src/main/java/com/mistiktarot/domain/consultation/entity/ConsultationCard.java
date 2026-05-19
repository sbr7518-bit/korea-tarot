package com.mistiktarot.domain.consultation.entity;

import com.mistiktarot.domain.card.entity.TarotCard;
import com.mistiktarot.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "consultation_cards")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ConsultationCard extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consultationCardsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultations_id", nullable = false)
    private Consultation consultation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tarot_cards_id", nullable = false)
    private TarotCard tarotCard;

    @Column(nullable = false, updatable = false)
    private Short position;

    @Builder
    public ConsultationCard(Consultation consultation, TarotCard tarotCard, Short position) {
        this.consultation = consultation;
        this.tarotCard = tarotCard;
        this.position = position;
    }
}
