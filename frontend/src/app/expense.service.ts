import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from './expense';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/expenses';

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  addExpense(description: string, amount: number, eventId: number): Observable<Expense> {
    const expense = { description, amount };
    return this.http.post<Expense>(`${this.apiUrl}?eventId=${eventId}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}