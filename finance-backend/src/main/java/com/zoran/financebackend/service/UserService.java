package com.zoran.financebackend.service;

import com.zoran.financebackend.dto.UserDto;
import com.zoran.financebackend.exception.BadRequestException;
import com.zoran.financebackend.exception.ResourceNotFoundException;
import com.zoran.financebackend.model.Role;
import com.zoran.financebackend.model.User;
import com.zoran.financebackend.model.UserStatus;
import com.zoran.financebackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new BadRequestException("Email already explicitly in use");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null)
            user.setRole(Role.VIEWER);
        if (user.getStatus() == null)
            user.setStatus(UserStatus.ACTIVE);

        User saved = userRepository.save(user);
        return mapToDto(saved);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public UserDto updateUserStatus(UUID id, UserStatus status) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus(status);
        return mapToDto(userRepository.save(user));
    }

    public UserDto assignRole(UUID id, Role role) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRole(role);
        return mapToDto(userRepository.save(user));
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setStatus(user.getStatus());
        return dto;
    }
}
