package com.gdg.tracker;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double budget;

    public Event() {}                          // JPA requires an empty constructor

    public Event(String name, double budget) { // note: no id — the DB assigns it
        this.name = name;
        this.budget = budget;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getBudget() { return budget; }

    public void setName(String name) { this.name = name; }
    public void setBudget(double budget) { this.budget = budget; }
}