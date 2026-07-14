import { Component, inject, OnInit, signal } from '@angular/core';   // + signal
import { EventService } from './event.service';
import { Event } from './event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private eventService = inject(EventService);
  events = signal<Event[]>([]);                    // was: events: Event[] = []

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events.set(data);                       // was: this.events = data
    });
  }
}