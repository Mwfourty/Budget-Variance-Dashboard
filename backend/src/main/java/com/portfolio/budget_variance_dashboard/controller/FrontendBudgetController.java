package com.portfolio.budget_variance_dashboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.budget_variance_dashboard.dto.BudgetEntryRequest;
import com.portfolio.budget_variance_dashboard.dto.DashboardResponse;
import com.portfolio.budget_variance_dashboard.dto.DashboardRowDTO;
import com.portfolio.budget_variance_dashboard.service.BudgetService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
}, allowCredentials = "true")
public class FrontendBudgetController {

    private final BudgetService budgetService;

    public FrontendBudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard(
            @RequestParam(defaultValue = "Q1") String quarter,
            @RequestParam(defaultValue = "month") String period) {
        return budgetService.getDashboard(quarter);
    }

    @PostMapping("/budgets")
    public ResponseEntity<DashboardRowDTO> createBudget(@RequestBody BudgetEntryRequest request) {
        return ResponseEntity.ok(budgetService.create(request));
    }

    @PutMapping("/budgets/{id}")
    public ResponseEntity<DashboardRowDTO> updateBudget(
            @PathVariable Long id, @RequestBody BudgetEntryRequest request) {
        return ResponseEntity.ok(budgetService.update(id, request));
    }

    @DeleteMapping("/budgets/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
