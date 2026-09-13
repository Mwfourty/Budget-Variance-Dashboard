package com.portfolio.budget_variance_dashboard.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponse(
        List<ChartPointDTO> chartData,
        SummaryDTO summary,
        List<DashboardRowDTO> rows,
        List<DepartmentStatusDTO> departments
) {
    public record ChartPointDTO(String period, BigDecimal allocated, BigDecimal actual) {}

    public record SummaryDTO(BigDecimal totalVariance, BigDecimal budgetUtilization) {}

    public record DepartmentStatusDTO(Long id, String name, String status) {}
}
