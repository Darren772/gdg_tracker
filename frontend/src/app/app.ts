import { Component, inject, OnInit, signal } from '@angular/core';   // + signal
import { EventService } from './event.service';
import { Event } from './event';
import { FormsModule } from "@angular/forms";
import { ExpenseService } from './expense.service';
import { Expense } from './expense';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private eventService = inject(EventService);
  private expenseService = inject(ExpenseService);
  events = signal<Event[]>([]);                    // was: events: Event[] = []
  newName = '';
  newBudget = 0;

  selectedEvent = signal<Event | null>(null);   // which event is clicked (null = none)
  expenses = signal<Expense[]>([]);              // the selected event's expenses
  newExpenseDesc = '';                           // form: expense description
  newExpenseAmount = 0;                           // form: expense amount

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

  selectEvent(event: Event): void {
    this.selectedEvent.set(event);
    this.loadExpenses();
  }

  loadExpenses(): void {
    const event = this.selectedEvent();
    if (event) {
      this.expenseService.getExpenses().subscribe(all => {
        this.expenses.set(all.filter(expense => expense.event.id === event.id));
      });
    }
  }

  addExpense(): void {
    const event = this.selectedEvent();
    if (!event) return;
    if (this.newExpenseDesc && this.newExpenseAmount > 0) {
      this.expenseService.addExpense(this.newExpenseDesc, this.newExpenseAmount, event.id).subscribe(() => {
        this.newExpenseDesc = '';
        this.newExpenseAmount = 0;
        this.loadExpenses();
      });
    }
  }

  totalSpent(): number {
    return this.expenses().reduce((sum, e) => sum + e.amount, 0);
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }
}