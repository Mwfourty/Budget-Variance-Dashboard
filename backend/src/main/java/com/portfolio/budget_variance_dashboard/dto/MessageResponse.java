package com.portfolio.budget_variance_dashboard.dto;

import java.time.LocalDateTime;

public record MessageResponse(
        Long id,
        String sender,
        String subject,
        String content,
        String status,
        String adminReason,
        String reviewer,
        LocalDateTime createdAt,
        LocalDateTime resolvedAt
) {}