package com.zoran.financebackend.service;

import com.zoran.financebackend.dto.RecordDto;
import com.zoran.financebackend.exception.ResourceNotFoundException;
import com.zoran.financebackend.model.FinancialRecord;
import com.zoran.financebackend.model.User;
import com.zoran.financebackend.repository.RecordRepository;
import com.zoran.financebackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserRepository userRepository;

    public RecordService(RecordRepository recordRepository, UserRepository userRepository) {
        this.recordRepository = recordRepository;
        this.userRepository = userRepository;
    }

    public RecordDto createRecord(FinancialRecord record, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        record.setCreatedBy(user);

        FinancialRecord saved = recordRepository.save(record);
        return mapToDto(saved);
    }

    public List<RecordDto> getAllRecords() {
        return recordRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public RecordDto getRecordById(UUID id) {
        FinancialRecord record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found"));
        return mapToDto(record);
    }

    public RecordDto updateRecord(UUID id, FinancialRecord recordDetails) {
        FinancialRecord record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found"));

        record.setAmount(recordDetails.getAmount());
        record.setType(recordDetails.getType());
        record.setCategory(recordDetails.getCategory());
        record.setDate(recordDetails.getDate());
        record.setNotes(recordDetails.getNotes());

        return mapToDto(recordRepository.save(record));
    }

    public void deleteRecord(UUID id) {
        if (!recordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Record not found");
        }
        recordRepository.deleteById(id);
    }

    private RecordDto mapToDto(FinancialRecord record) {
        RecordDto dto = new RecordDto();
        dto.setId(record.getId());
        dto.setAmount(record.getAmount());
        dto.setType(record.getType());
        dto.setCategory(record.getCategory());
        dto.setDate(record.getDate());
        dto.setNotes(record.getNotes());
        if (record.getCreatedBy() != null)
            dto.setCreatedById(record.getCreatedBy().getId());
        return dto;
    }
}
