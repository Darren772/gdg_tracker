import { Component, inject, OnInit, signal } from '@angular/core';   // + signal
import { EventService } from './event.service';
import { Event } from './event';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private eventService = inject(EventService);
  events = signal<Event[]>([]);                    // was: events: Event[] = []
  newName = '';
  newBudget = 0;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events.set(data);                       // was: this.events = data
    });
  }

  addEvent(): void {
    if (!this.newName || this.newBudget <= 0) {
      return;
    }

    this.eventService.createEvent(this.newName, this.newBudget).subscribe(() => {
      this.newName = '';
      this.newBudget = 0;
      this.loadEvents();
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }

}