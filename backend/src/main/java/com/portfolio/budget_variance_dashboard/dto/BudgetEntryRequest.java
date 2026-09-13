package com.portfolio.budget_variance_dashboard.dto;

import java.math.BigDecimal;

public record BudgetEntryRequest(
        String department,
        BigDecimal allocated,
        BigDecimal actual,
        Integer fiscalYear,
        String fiscalQuarter
) {}
