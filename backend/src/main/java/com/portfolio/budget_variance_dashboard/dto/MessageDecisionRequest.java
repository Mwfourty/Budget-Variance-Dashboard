package com.portfolio.budget_variance_dashboard.dto;

public record MessageDecisionRequest(
        String reviewerUsername,
        String status,
        String reason
) {}