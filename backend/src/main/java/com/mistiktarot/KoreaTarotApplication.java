package com.mistiktarot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class KoreaTarotApplication {

    public static void main(String[] args) {
        SpringApplication.run(KoreaTarotApplication.class, args);
    }
}
