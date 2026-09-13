package com.portfolio.budget_variance_dashboard.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.portfolio.budget_variance_dashboard.dto.AdminLoginRequest;
import com.portfolio.budget_variance_dashboard.dto.AuthRequest;
import com.portfolio.budget_variance_dashboard.dto.AuthResponse;
import com.portfolio.budget_variance_dashboard.dto.RegisterRequest;
import com.portfolio.budget_variance_dashboard.model.AppUser;
import com.portfolio.budget_variance_dashboard.model.Department;
import com.portfolio.budget_variance_dashboard.repository.AppUserRepository;
import com.portfolio.budget_variance_dashboard.repository.DepartmentRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
}, allowCredentials = "true")
public class AuthController {

    private final AppUserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final String adminCode;

    public AuthController(
            AppUserRepository userRepository,
            DepartmentRepository departmentRepository,
            @Value("${app.admin-code:123456}") String adminCode) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.adminCode = adminCode;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        AppUser user = findUser(request.email(), request.password());
        return response(user);
    }

    @PostMapping("/admin/login")
    public AuthResponse adminLogin(@RequestBody AdminLoginRequest request) {
        if (!adminCode.equals(request.adminCode())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin access code");
        }
        AppUser user = findUser(request.email(), request.password());
        if (!user.getRole().contains("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator access required");
        }
        return response(user);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByUsername(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account already exists for this email");
        }
        Department department = departmentRepository.findByNameIgnoreCase(request.department())
                .orElseGet(() -> departmentRepository.save(new Department(null, request.department())));
        AppUser user = new AppUser(null, request.email(), request.password(), "ROLE_USER", department);
        return ResponseEntity.status(HttpStatus.CREATED).body(response(userRepository.save(user)));
    }

    private AppUser findUser(String email, String password) {
        AppUser user = userRepository.findByUsername(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!user.isActive()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This account has been deactivated");
        }
        if (!user.getPassword().equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return user;
    }

    private AuthResponse response(AppUser user) {
        String role = user.getRole().replaceFirst("^ROLE_", "");
        AuthResponse.UserResponse userResponse = new AuthResponse.UserResponse(
                user.getId(),
                user.getUsername(),
                user.getUsername(),
                role
        );
        return new AuthResponse(UUID.randomUUID().toString(), userResponse);
    }
}
