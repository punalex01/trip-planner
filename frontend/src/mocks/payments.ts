import { IPayment } from 'src/interfaces/Payment';
import { mockUsers } from './users';

export const mockPayments: IPayment = {
  name: 'Ramen Nagi',
  date: new Date(2024, 6, 2),
  lendee: mockUsers[0],
  isReturned: false,
  total: 121,
  lenderAmounts: [
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
  uuid: 'Placeholder UUID',
};
