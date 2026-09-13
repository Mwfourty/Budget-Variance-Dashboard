package com.portfolio.budget_variance_dashboard.dto;

public record AdminUserResponse(Long id, String name, String email, String role, boolean active) {}