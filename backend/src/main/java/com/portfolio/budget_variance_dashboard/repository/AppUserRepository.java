package com.portfolio.budget_variance_dashboard.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portfolio.budget_variance_dashboard.model.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    
    // Returns an Optional to prevent NullPointerExceptions if the user doesn't exist
    Optional<AppUser> findByUsername(String username);
}
