package com.portfolio.budget_variance_dashboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.budget_variance_dashboard.model.BudgetMessage;

@Repository
public interface BudgetMessageRepository extends JpaRepository<BudgetMessage, Long> {
    @EntityGraph(attributePaths = {"sender", "reviewer"})
    List<BudgetMessage> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"sender", "reviewer"})
    List<BudgetMessage> findBySenderUsernameOrderByCreatedAtDesc(String username);
}