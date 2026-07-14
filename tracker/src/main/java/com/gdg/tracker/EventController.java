package com.gdg.tracker;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return List.of(
            new Event(1L, "Flutter Workshop", 500),
            new Event(2L, "DevFest", 2000)
        );
    }
}