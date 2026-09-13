package com.portfolio.budget_variance_dashboard.dto;

public record AuthResponse(String token, UserResponse user) {
    public record UserResponse(Long id, String name, String email, String role) {}
}
