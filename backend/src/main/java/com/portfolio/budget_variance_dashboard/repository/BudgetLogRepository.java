package com.portfolio.budget_variance_dashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.budget_variance_dashboard.model.BudgetLog;

@Repository
public interface BudgetLogRepository extends JpaRepository<BudgetLog, Long> {
    
    // Automatically generates SQL: SELECT * FROM budget_logs WHERE fiscal_year = ? AND fiscal_quarter = ?
    List<BudgetLog> findByFiscalYearAndFiscalQuarter(Integer fiscalYear, String fiscalQuarter);
}