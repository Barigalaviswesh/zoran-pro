package com.zoran.financebackend.controller;

import com.zoran.financebackend.dto.RecordDto;
import com.zoran.financebackend.model.FinancialRecord;
import com.zoran.financebackend.service.RecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RecordDto> createRecord(@RequestBody FinancialRecord record, Authentication authentication) {
        return ResponseEntity.ok(recordService.createRecord(record, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<RecordDto>> getAllRecords() {
        return ResponseEntity.ok(recordService.getAllRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecordDto> getRecordById(@PathVariable UUID id) {
        return ResponseEntity.ok(recordService.getRecordById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RecordDto> updateRecord(@PathVariable UUID id, @RequestBody FinancialRecord record) {
        return ResponseEntity.ok(recordService.updateRecord(id, record));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRecord(@PathVariable UUID id) {
        recordService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}
