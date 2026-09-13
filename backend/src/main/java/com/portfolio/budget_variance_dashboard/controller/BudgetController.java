package com.portfolio.budget_variance_dashboard.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.budget_variance_dashboard.dto.BudgetSummaryDTO;
import com.portfolio.budget_variance_dashboard.dto.UpdateStatusDTO;
import com.portfolio.budget_variance_dashboard.service.BudgetService;

@RestController
@RequestMapping("/api/v1/budgets")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
}, allowCredentials = "true")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    // Example API Call: GET http://localhost:8080/api/v1/budgets/summary?year=2026&quarter=Q1
    @GetMapping("/summary")
    public ResponseEntity<List<BudgetSummaryDTO>> getSummary(
            @RequestParam(defaultValue = "2026") Integer year,
            @RequestParam(defaultValue = "Q1") String quarter) {
        
        List<BudgetSummaryDTO> summary = budgetService.getDashboardSummary(year, quarter);
        return ResponseEntity.ok(summary);
    }

    // Example API Call: PATCH http://localhost:8080/api/v1/budgets/2/status
    @PatchMapping("/{id}/status")
    public ResponseEntity<BudgetSummaryDTO> updateStatus(
            @PathVariable Long id, 
            @RequestBody UpdateStatusDTO request) {
        
        BudgetSummaryDTO updatedSummary = budgetService.updateBudgetStatus(id, request.status());
        return ResponseEntity.ok(updatedSummary);
    }
}