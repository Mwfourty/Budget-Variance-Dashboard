package com.portfolio.budget_variance_dashboard.seeder;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;// better than using the console
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.portfolio.budget_variance_dashboard.model.AppUser;
import com.portfolio.budget_variance_dashboard.model.BudgetLog;
import com.portfolio.budget_variance_dashboard.model.Department;
import com.portfolio.budget_variance_dashboard.model.Status;
import com.portfolio.budget_variance_dashboard.repository.AppUserRepository;
import com.portfolio.budget_variance_dashboard.repository.BudgetLogRepository;
import com.portfolio.budget_variance_dashboard.repository.DepartmentRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    // Upgraded to a standard Spring Boot logger
    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final AppUserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final BudgetLogRepository budgetLogRepository;

    public DatabaseSeeder(AppUserRepository userRepository, 
                          DepartmentRepository departmentRepository, 
                          BudgetLogRepository budgetLogRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.budgetLogRepository = budgetLogRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        
        // Only run the seeder if the database is completely empty
        if (departmentRepository.count() == 0) {
            logger.info("Seeding database with dummy finance data...");

            // 1. Create Departments
            Department itDept = new Department(null, "IT");
            Department hrDept = new Department(null, "HR");
            Department marketingDept = new Department(null, "Marketing");
            
            departmentRepository.saveAll(List.of(itDept, hrDept, marketingDept));

            // 2. Create Users
            AppUser admin = new AppUser(null, "finance_admin", "password123", "ROLE_ADMIN", null);
            AppUser itManager = new AppUser(null, "it_manager", "password123", "ROLE_USER", itDept);
            
            userRepository.saveAll(List.of(admin, itManager));

            // 3. Create Budget Logs for Q1 2026
            BudgetLog itLog = new BudgetLog(null, itDept, "Q1", 2026, 
                    new BigDecimal("1500000.00"), // Allocated R1.5M
                    new BigDecimal("1200000.00"), // Spent R1.2M (Under budget)
                    Status.APPROVED);

            BudgetLog hrLog = new BudgetLog(null, hrDept, "Q1", 2026, 
                    new BigDecimal("500000.00"), 
                    new BigDecimal("550000.00"),  // Over budget
                    Status.PENDING);

            BudgetLog marketingLog = new BudgetLog(null, marketingDept, "Q1", 2026, 
                    new BigDecimal("800000.00"), 
                    new BigDecimal("100000.00"), 
                    Status.DRAFT);

            budgetLogRepository.saveAll(List.of(itLog, hrLog, marketingLog));

            logger.info("Database seeding complete!");
        } else {
            logger.info("Database already seeded. Skipping initialization.");
        }
    }
}