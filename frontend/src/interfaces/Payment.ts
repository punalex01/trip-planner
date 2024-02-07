import { User } from './User';

export interface Payment {
  name: string;
  date: Date;
  lendee: User; // User
  isReturned: boolean;
  total: number;
  lenderAmounts: LenderAmount[];
}

export interface LenderAmount {
  user: User; // User
  amount: number;
  isReturned: boolean;
}
