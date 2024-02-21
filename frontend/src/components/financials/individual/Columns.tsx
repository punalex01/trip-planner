import { ColumnDef } from '@tanstack/react-table';
import { User, Users } from 'lucide-react';
import { currencyFormatter } from 'src/global/functions';
import { format } from 'date-fns';

export type Payment = {
  name: string;
  amount: number;
  isIndividual: boolean;
  date: Date;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'isIndividual',
    header: '',
    cell: ({ row }) => {
      const isIndividual = row.getValue('isIndividual');
      return isIndividual ? <User /> : <Users />;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <div className='font-bold'>{name}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date: Date = row.getValue('date');
      return format(date, 'MM/dd/yyyy');
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      return <div className='font-medium'>{currencyFormatter.format(amount)}</div>;
    },
  },
];
