package com.zoran.financebackend.controller;

import com.zoran.financebackend.dto.UserDto;
import com.zoran.financebackend.model.Role;
import com.zoran.financebackend.model.UserStatus;
import com.zoran.financebackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<UserDto> updateStatus(@PathVariable UUID id, @RequestParam UserStatus status) {
        return ResponseEntity.ok(userService.updateUserStatus(id, status));
    }

    @PostMapping("/{id}/role")
    public ResponseEntity<UserDto> assignRole(@PathVariable UUID id, @RequestParam Role role) {
        return ResponseEntity.ok(userService.assignRole(id, role));
    }
}
