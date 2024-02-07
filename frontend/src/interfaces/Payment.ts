import { IUser } from './User';

export interface IPayment {
  name: string;
  date: Date;
  lendee: IUser; // User
  isReturned: boolean;
  total: number;
  lenderAmounts: LenderAmount[];
  uuid: string;
}

export interface LenderAmount {
  user: IUser; // User
  amount: number;
  isReturned: boolean;
}
