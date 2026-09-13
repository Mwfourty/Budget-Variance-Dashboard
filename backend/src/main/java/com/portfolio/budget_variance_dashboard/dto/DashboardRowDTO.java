package com.portfolio.budget_variance_dashboard.dto;

import java.math.BigDecimal;

public record DashboardRowDTO(
        Long id,
        String department,
        BigDecimal allocated,
        BigDecimal actual,
        BigDecimal variance,
        BigDecimal utilization,
        String status
) {}
