import { Event } from './event';

export interface Expense {
  id: number;
  description: string;
  amount: number;
  event: Event;
}