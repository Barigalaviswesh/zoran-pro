package com.zoran.financebackend.dto;

import com.zoran.financebackend.model.Role;
import com.zoran.financebackend.model.UserStatus;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private Role role;
    private UserStatus status;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }
}
