package com.zoran.financebackend.controller;

import com.zoran.financebackend.dto.AuthResponse;
import com.zoran.financebackend.dto.LoginRequest;
import com.zoran.financebackend.dto.UserDto;
import com.zoran.financebackend.model.User;
import com.zoran.financebackend.service.AuthService;
import com.zoran.financebackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }
}
