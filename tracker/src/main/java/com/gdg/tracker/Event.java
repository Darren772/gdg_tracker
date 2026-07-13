package com.gdg.tracker;

public class Event {
    private Long id;
    private String name;
    private double budget;

    public Event(Long id, String name, double budget) {
        this.id = id;
        this.name = name;
        this.budget = budget;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getBudget() { return budget; }
}
