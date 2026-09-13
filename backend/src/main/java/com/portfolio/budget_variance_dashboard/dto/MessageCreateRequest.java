package com.portfolio.budget_variance_dashboard.dto;

public record MessageCreateRequest(
        String senderUsername,
        String subject,
        String content
) {}