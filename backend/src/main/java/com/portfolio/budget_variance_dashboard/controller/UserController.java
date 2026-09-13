package com.portfolio.budget_variance_dashboard.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.portfolio.budget_variance_dashboard.dto.AdminUserResponse;
import com.portfolio.budget_variance_dashboard.dto.UserStatusRequest;
import com.portfolio.budget_variance_dashboard.model.AppUser;
import com.portfolio.budget_variance_dashboard.repository.AppUserRepository;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
}, allowCredentials = "true")
public class UserController {

    private final AppUserRepository userRepository;

    public UserController(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<AdminUserResponse> getUsers(@RequestParam String requesterUsername) {
        requireAdmin(requesterUsername);
        return userRepository.findAll().stream().map(this::toResponse).toList();
    }

    @PatchMapping("/{id}/status")
    public AdminUserResponse updateStatus(
            @PathVariable Long id, @RequestBody UserStatusRequest request) {
        AppUser requester = requireAdmin(request.requesterUsername());
        if (requester.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot deactivate your own account");
        }
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setActive(request.active());
        return toResponse(userRepository.save(user));
    }

    private AppUser requireAdmin(String username) {
        AppUser user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User account not found"));
        if (!user.getRole().contains("ADMIN") || !user.isActive()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator access required");
        }
        return user;
    }

    private AdminUserResponse toResponse(AppUser user) {
        return new AdminUserResponse(
                user.getId(),
                user.getUsername(),
                user.getUsername(),
                user.getRole().replaceFirst("^ROLE_", ""),
                user.isActive());
    }
}