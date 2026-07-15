package com.gdg.tracker;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EventRepository eventRepository;

    public DataSeeder(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) {
        if (eventRepository.count() == 0) {          // only seed if DB is empty
            eventRepository.save(new Event("Flutter Workshop", 500));
            eventRepository.save(new Event("DevFest", 2000));
            eventRepository.save(new Event("GDGo", 2300));
        }
    }
}

