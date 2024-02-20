import { FC } from 'react';
import { currencyFormatter } from 'src/global/functions';

interface DebtProps {
  user: string;
  total: number;
}

export const Debt: FC<DebtProps> = ({ user, total }) => {
  return (
    <>
      <div className='flex flex-row h-12 w-full border rounded-lg items-center justify-between px-3'>
        <p>{user}</p>
        <p>{currencyFormatter.format(total)}</p>
      </div>
    </>
  );
};
