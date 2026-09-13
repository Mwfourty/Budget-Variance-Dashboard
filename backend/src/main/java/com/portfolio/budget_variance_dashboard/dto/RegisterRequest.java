package com.portfolio.budget_variance_dashboard.dto;

public record RegisterRequest(
        String name,
        String email,
        String password,
        String department
) {}
