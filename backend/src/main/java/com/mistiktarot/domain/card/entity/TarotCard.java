package com.mistiktarot.domain.card.entity;

import com.mistiktarot.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tarot_cards")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TarotCard extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tarotCardsId;

    @Column(nullable = false, length = 100)
    private String nameKr;

    @Column(nullable = false, length = 100)
    private String nameEn;

    @Column(nullable = false)
    private Short cardNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ArcanaType arcanaType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Suit suit;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String imageUrl;
}
