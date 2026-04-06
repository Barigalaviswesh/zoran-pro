package com.zoran.financebackend.repository;

import com.zoran.financebackend.model.FinancialRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecordRepository
        extends JpaRepository<FinancialRecord, UUID>, JpaSpecificationExecutor<FinancialRecord> {
}
