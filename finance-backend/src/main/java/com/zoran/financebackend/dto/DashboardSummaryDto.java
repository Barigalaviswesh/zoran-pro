package com.zoran.financebackend.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardSummaryDto {
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal netBalance;
    private Map<String, BigDecimal> categorySummary;
    private Map<String, BigDecimal> monthlySummary;
    private List<RecordDto> recentTransactions;

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getNetBalance() {
        return netBalance;
    }

    public void setNetBalance(BigDecimal netBalance) {
        this.netBalance = netBalance;
    }

    public Map<String, BigDecimal> getCategorySummary() {
        return categorySummary;
    }

    public void setCategorySummary(Map<String, BigDecimal> categorySummary) {
        this.categorySummary = categorySummary;
    }

    public Map<String, BigDecimal> getMonthlySummary() {
        return monthlySummary;
    }

    public void setMonthlySummary(Map<String, BigDecimal> monthlySummary) {
        this.monthlySummary = monthlySummary;
    }

    public List<RecordDto> getRecentTransactions() {
        return recentTransactions;
    }

    public void setRecentTransactions(List<RecordDto> recentTransactions) {
        this.recentTransactions = recentTransactions;
    }
}
