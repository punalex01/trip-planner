import { IPayment, IPaymentOwed } from 'src/interfaces/Payment';
import { mockUsers } from './users';

export const mockPayment1: IPayment = {
  name: 'Ramen Nagi',
  date: new Date(2024, 6, 2),
  lender: mockUsers[0],
  isReturned: false,
  total: 121,
  lendeeAmounts: [
    {
      user: mockUsers[0],
      amount: 30,
      isReturned: true,
    },
    {
      user: mockUsers[1],
      amount: 61,
      isReturned: false,
    },
    {
      user: mockUsers[2],
      amount: 30,
      isReturned: true,
    },
  ],
  uuid: 'Placeholder UUID1',
};

export const mockPayment2: IPayment = {
  name: 'Taco Bell',
  date: new Date(2024, 6, 2),
  lender: mockUsers[0],
  isReturned: false,
  total: 121,
  lendeeAmounts: [
    {
      user: mockUsers[0],
      amount: 30,
      isReturned: true,
    },
    {
      user: mockUsers[1],
      amount: 61,
      isReturned: false,
    },
    {
      user: mockUsers[2],
      amount: 30,
      isReturned: true,
    },
  ],
  uuid: 'Placeholder UUID2',
};

export const mockPayments: IPayment[] = [mockPayment1, mockPayment2];

export const mockPaymentsOwed: IPaymentOwed[] = [
  { name: 'Ramen Nagi', total: 30, paymentUUID: 'Placeholder UUID1' },
  { name: 'Taco Bell', total: 30, paymentUUID: 'Placeholder UUID2' },
  { name: 'Ramen Nagi', total: 30, paymentUUID: 'Placeholder UUID3' },
  { name: 'Taco Bell', total: 30, paymentUUID: 'Placeholder UUID4' },
  { name: 'Ramen Nagi', total: 30, paymentUUID: 'Placeholder UUID5' },
  { name: 'Taco Bell', total: 30, paymentUUID: 'Placeholder UUID6' },
  { name: 'Ramen Nagi', total: 30, paymentUUID: 'Placeholder UUID7' },
  { name: 'Taco Bell', total: 30, paymentUUID: 'Placeholder UUID8' },
  { name: 'Taco Bell', total: 30, paymentUUID: 'Placeholder UUID9' },
];
