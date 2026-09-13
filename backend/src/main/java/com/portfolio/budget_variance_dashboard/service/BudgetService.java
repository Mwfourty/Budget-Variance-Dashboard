package com.portfolio.budget_variance_dashboard.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.portfolio.budget_variance_dashboard.dto.BudgetEntryRequest;
import com.portfolio.budget_variance_dashboard.dto.BudgetSummaryDTO;
import com.portfolio.budget_variance_dashboard.dto.DashboardResponse;
import com.portfolio.budget_variance_dashboard.dto.DashboardRowDTO;
import com.portfolio.budget_variance_dashboard.model.BudgetLog;
import com.portfolio.budget_variance_dashboard.model.Department;
import com.portfolio.budget_variance_dashboard.model.Status; // <-- Missing import added here
import com.portfolio.budget_variance_dashboard.repository.BudgetLogRepository;
import com.portfolio.budget_variance_dashboard.repository.DepartmentRepository;

@Service
public class BudgetService {

    private final BudgetLogRepository budgetLogRepository;
    private final DepartmentRepository departmentRepository;

    public BudgetService(BudgetLogRepository budgetLogRepository, DepartmentRepository departmentRepository) {
        this.budgetLogRepository = budgetLogRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<BudgetSummaryDTO> getDashboardSummary(Integer year, String quarter) {
        // Fetch raw database records
        List<BudgetLog> logs = budgetLogRepository.findByFiscalYearAndFiscalQuarter(year, quarter);

        // Convert Entities to DTOs and perform calculations
        return logs.stream().map(log -> {
            BigDecimal allocated = log.getAllocatedAmount() != null ? log.getAllocatedAmount() : BigDecimal.ZERO;
            BigDecimal actual = log.getActualAmount() != null ? log.getActualAmount() : BigDecimal.ZERO;

            // Variance = Allocated - Actual
            BigDecimal variance = allocated.subtract(actual);

            // Utilization = (Actual / Allocated) * 100
            BigDecimal utilization = BigDecimal.ZERO;
            if (allocated.compareTo(BigDecimal.ZERO) > 0) {
                utilization = actual.divide(allocated, 4, RoundingMode.HALF_UP)
                                    .multiply(new BigDecimal("100"))
                                    .setScale(1, RoundingMode.HALF_UP);
            }

            return new BudgetSummaryDTO(
                    log.getId(),
                    log.getDepartment().getName(),
                    allocated,
                    actual,
                    variance,
                    utilization,
                    log.getStatus().name()
            );
        }).collect(Collectors.toList());
    }

    public BudgetSummaryDTO updateBudgetStatus(Long id, String newStatus) {
        // 1. Find the existing log, or throw an error if it doesn't exist
        BudgetLog log = budgetLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget Log not found with id: " + id));

        // 2. Convert the incoming string to our Enum and update it
        try {
            Status parsedStatus = Status.valueOf(newStatus.toUpperCase());
            log.setStatus(parsedStatus);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status provided. Must be DRAFT, PENDING, APPROVED, or REJECTED.");
        }

        // 3. Save the update to MySQL
        BudgetLog updatedLog = budgetLogRepository.save(log);

        // 4. Return the updated data using our existing calculation logic
        BigDecimal allocated = updatedLog.getAllocatedAmount() != null ? updatedLog.getAllocatedAmount() : BigDecimal.ZERO;
        BigDecimal actual = updatedLog.getActualAmount() != null ? updatedLog.getActualAmount() : BigDecimal.ZERO;
        BigDecimal variance = allocated.subtract(actual);
        
        BigDecimal utilization = BigDecimal.ZERO;
        if (allocated.compareTo(BigDecimal.ZERO) > 0) {
            utilization = actual.divide(allocated, 4, RoundingMode.HALF_UP)
                                .multiply(new BigDecimal("100"))
                                .setScale(1, RoundingMode.HALF_UP);
        }

        return new BudgetSummaryDTO(
                updatedLog.getId(),
                updatedLog.getDepartment().getName(),
                allocated,
                actual,
                variance,
                utilization,
                updatedLog.getStatus().name()
        );
    }

        public DashboardResponse getDashboard(String quarter) {
        List<BudgetLog> logs = budgetLogRepository.findByFiscalYearAndFiscalQuarter(2026, quarter);
        if (logs.isEmpty()) {
            logs = budgetLogRepository.findAll();
        }

        List<DashboardResponse.ChartPointDTO> chartData = List.of(new DashboardResponse.ChartPointDTO(
            quarter,
            logs.stream().map(BudgetLog::getAllocatedAmount).reduce(BigDecimal.ZERO, BigDecimal::add),
            logs.stream().map(BudgetLog::getActualAmount).reduce(BigDecimal.ZERO, BigDecimal::add)
        ));
        BigDecimal allocated = chartData.get(0).allocated();
        BigDecimal actual = chartData.get(0).actual();
        BigDecimal utilization = allocated.compareTo(BigDecimal.ZERO) > 0
            ? actual.divide(allocated, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(1, RoundingMode.HALF_UP)
            : BigDecimal.ZERO;

        List<DashboardResponse.DepartmentStatusDTO> departments = logs.stream()
            .map(log -> new DashboardResponse.DepartmentStatusDTO(log.getId(), log.getDepartment().getName(), log.getStatus().name().toLowerCase()))
            .toList();

        return new DashboardResponse(
            chartData,
            new DashboardResponse.SummaryDTO(allocated.subtract(actual), utilization),
            logs.stream().map(this::toDashboardRow).toList(),
            departments
        );
        }

        public DashboardRowDTO create(BudgetEntryRequest request) {
        Department department = departmentRepository.findByNameIgnoreCase(request.department())
            .orElseGet(() -> departmentRepository.save(new Department(null, request.department())));
        BudgetLog log = new BudgetLog(
            null,
            department,
            request.fiscalQuarter() == null ? "Q1" : request.fiscalQuarter(),
            request.fiscalYear() == null ? 2026 : request.fiscalYear(),
            request.allocated(),
            request.actual(),
            Status.DRAFT
        );
        return toDashboardRow(budgetLogRepository.save(log));
        }

        public DashboardRowDTO update(Long id, BudgetEntryRequest request) {
        BudgetLog log = budgetLogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Budget Log not found with id: " + id));
        Department department = departmentRepository.findByNameIgnoreCase(request.department())
            .orElseGet(() -> departmentRepository.save(new Department(null, request.department())));
        log.setDepartment(department);
        log.setAllocatedAmount(request.allocated());
        log.setActualAmount(request.actual());
        return toDashboardRow(budgetLogRepository.save(log));
        }

        public void delete(Long id) {
        budgetLogRepository.deleteById(id);
        }

        private DashboardRowDTO toDashboardRow(BudgetLog log) {
        BigDecimal allocated = log.getAllocatedAmount() == null ? BigDecimal.ZERO : log.getAllocatedAmount();
        BigDecimal actual = log.getActualAmount() == null ? BigDecimal.ZERO : log.getActualAmount();
        BigDecimal utilization = allocated.compareTo(BigDecimal.ZERO) > 0
            ? actual.divide(allocated, 4, RoundingMode.HALF_UP).multiply(new BigDecimal("100")).setScale(1, RoundingMode.HALF_UP)
            : BigDecimal.ZERO;
        return new DashboardRowDTO(log.getId(), log.getDepartment().getName(), allocated, actual,
            allocated.subtract(actual), utilization, log.getStatus().name().toLowerCase());
        }
}