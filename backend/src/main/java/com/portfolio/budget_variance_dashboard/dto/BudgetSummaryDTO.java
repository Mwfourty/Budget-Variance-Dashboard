package com.portfolio.budget_variance_dashboard.dto;

import java.math.BigDecimal;

public record BudgetSummaryDTO(
    Long id,
    String departmentName,
    BigDecimal allocatedAmount,
    BigDecimal actualAmount,
    BigDecimal deviation,
    BigDecimal variance,
    BigDecimal utilizationPercentage,
    String status
) {}