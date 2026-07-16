package com.gdg.tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    public Expense() {}

    public Expense(String description, double amount) { // note: no id — the DB assigns it
        this.description = description;
        this.amount = amount;
    }

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public double getAmount() { return amount; }
    public Event getEvent() { return event; }

    public void setDescription(String description) { this.description = description; }
    public void setAmount(double amount) { this.amount = amount; }
    public void setEvent(Event event) { this.event = event; }
}