import { IIndividualPayment } from 'src/interfaces/Payment';

export const mockIndividualPayments: IIndividualPayment[] = [
  {
    name: 'Shoes',
    amount: 42.21,
    isIndividual: true,
    date: new Date(2024, 3, 2),
  },
  {
    name: 'Tacos',
    amount: 12,
    isIndividual: false,
    date: new Date(2024, 3, 3),
  },
];
