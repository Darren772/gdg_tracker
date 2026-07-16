package com.gdg.tracker;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final EventRepository eventRepository; 

    public ExpenseService(ExpenseRepository expenseRepository, EventRepository eventRepository) {
        this.expenseRepository = expenseRepository;
        this.eventRepository = eventRepository;
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense createExpense(Expense expense, Long eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        expense.setEvent(event);
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("Expense not found"));
        expenseRepository.delete(expense);
    }

}