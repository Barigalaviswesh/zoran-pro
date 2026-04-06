package com.zoran.financebackend.service;

import com.zoran.financebackend.dto.DashboardSummaryDto;
import com.zoran.financebackend.dto.RecordDto;
import com.zoran.financebackend.model.RecordType;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final RecordService recordService;

    public DashboardService(RecordService recordService) {
        this.recordService = recordService;
    }

    public DashboardSummaryDto getSummary() {
        List<RecordDto> allRecords = recordService.getAllRecords();

        BigDecimal totalIncome = allRecords.stream()
                .filter(r -> r.getType() == RecordType.INCOME)
                .map(RecordDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = allRecords.stream()
                .filter(r -> r.getType() == RecordType.EXPENSE)
                .map(RecordDto::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> categorySummary = allRecords.stream()
                .collect(Collectors.groupingBy(
                        RecordDto::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, RecordDto::getAmount, BigDecimal::add)));

        Map<String, BigDecimal> monthlySummary = allRecords.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getDate().getYear() + "-" + String.format("%02d", r.getDate().getMonthValue()),
                        Collectors.reducing(BigDecimal.ZERO,
                                r -> r.getType() == RecordType.INCOME ? r.getAmount() : r.getAmount().negate(),
                                BigDecimal::add)));

        List<RecordDto> recentTransactions = allRecords.stream()
                .sorted(Comparator.comparing(RecordDto::getDate).reversed())
                .limit(10)
                .collect(Collectors.toList());

        DashboardSummaryDto summary = new DashboardSummaryDto();
        summary.setTotalIncome(totalIncome);
        summary.setTotalExpense(totalExpense);
        summary.setNetBalance(totalIncome.subtract(totalExpense));
        summary.setCategorySummary(categorySummary);
        summary.setMonthlySummary(monthlySummary);
        summary.setRecentTransactions(recentTransactions);

        return summary;
    }
}
