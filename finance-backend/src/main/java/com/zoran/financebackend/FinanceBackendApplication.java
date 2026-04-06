package com.zoran.financebackend;

import com.zoran.financebackend.model.Role;
import com.zoran.financebackend.model.User;
import com.zoran.financebackend.model.UserStatus;
import com.zoran.financebackend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FinanceBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinanceBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (!userRepository.existsByEmail("admin@zoran.com")) {
				User admin = new User();
				admin.setName("Admin User");
				admin.setEmail("admin@zoran.com");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole(Role.ADMIN);
				admin.setStatus(UserStatus.ACTIVE);
				userRepository.save(admin);

			}
		};
	}
}
