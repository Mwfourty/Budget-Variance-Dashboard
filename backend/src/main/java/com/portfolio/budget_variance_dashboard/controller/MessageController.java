package com.portfolio.budget_variance_dashboard.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.portfolio.budget_variance_dashboard.dto.MessageCreateRequest;
import com.portfolio.budget_variance_dashboard.dto.MessageDecisionRequest;
import com.portfolio.budget_variance_dashboard.dto.MessageResponse;
import com.portfolio.budget_variance_dashboard.model.AppUser;
import com.portfolio.budget_variance_dashboard.model.BudgetMessage;
import com.portfolio.budget_variance_dashboard.model.MessageStatus;
import com.portfolio.budget_variance_dashboard.repository.AppUserRepository;
import com.portfolio.budget_variance_dashboard.repository.BudgetMessageRepository;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000"
}, allowCredentials = "true")
public class MessageController {

    private final BudgetMessageRepository messageRepository;
    private final AppUserRepository userRepository;

    public MessageController(BudgetMessageRepository messageRepository, AppUserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<MessageResponse> getMessages(@RequestParam String username, @RequestParam boolean admin) {
        List<BudgetMessage> messages = admin
                ? messageRepository.findAllByOrderByCreatedAtDesc()
                : messageRepository.findBySenderUsernameOrderByCreatedAtDesc(username);
        return messages.stream().map(this::toResponse).toList();
    }

    @PostMapping
    public ResponseEntity<MessageResponse> createMessage(@RequestBody MessageCreateRequest request) {
        AppUser sender = findUser(request.senderUsername());
        if (request.subject() == null || request.subject().isBlank()
                || request.content() == null || request.content().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Subject and message are required");
        }
        BudgetMessage message = new BudgetMessage(
                null, sender, request.subject().trim(), request.content().trim(),
                MessageStatus.OPEN, null, null, null, null);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(messageRepository.save(message)));
    }

    @PatchMapping("/{id}")
    public MessageResponse decideMessage(
            @PathVariable Long id, @RequestBody MessageDecisionRequest request) {
        BudgetMessage message = messageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found"));
        AppUser reviewer = findUser(request.reviewerUsername());
        if (!reviewer.getRole().contains("ADMIN")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator access required");
        }
        MessageStatus status;
        try {
            status = MessageStatus.valueOf(request.status().toUpperCase());
        } catch (IllegalArgumentException | NullPointerException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status must be APPROVED or REJECTED");
        }
        if (status == MessageStatus.OPEN || request.reason() == null || request.reason().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An approval or rejection reason is required");
        }
        message.setStatus(status);
        message.setAdminReason(request.reason().trim());
        message.setReviewer(reviewer);
        message.setResolvedAt(java.time.LocalDateTime.now());
        return toResponse(messageRepository.save(message));
    }

    private AppUser findUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User account not found"));
    }

    private MessageResponse toResponse(BudgetMessage message) {
        return new MessageResponse(
                message.getId(),
                message.getSender().getUsername(),
                message.getSubject(),
                message.getContent(),
                message.getStatus().name().toLowerCase(),
                message.getAdminReason(),
                message.getReviewer() == null ? null : message.getReviewer().getUsername(),
                message.getCreatedAt(),
                message.getResolvedAt());
    }
}