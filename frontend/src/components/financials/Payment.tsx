import { ChevronDown, ChevronUp } from 'lucide-react';
import { FC, useState } from 'react';
import { mockPayments } from '../../mocks/payments';
import { currencyFormatter } from 'src/global/functions';
import { format } from 'date-fns';

interface PaymentProps {}

export const Payment: FC<PaymentProps> = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className='w-full border border-eggplant rounded-lg divide-y divide-eggplant'>
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={'flex w-full h-20 px-3 justify-between hover:cursor-pointer hover:bg-eggplant/20'}
      >
        <div className='flex flex-col justify-center'>
          <p className='text-lg'>
            {mockPayments.name} | {format(mockPayments.date, 'MM/dd/yyyy')}
          </p>
          <p className='italic'>{mockPayments.lendee.name}</p>
        </div>
        <div className='flex flex-row h-full items-center space-x-6'>
          <div className='flex w-32 h-10 px-4 justify-center items-center border rounded-lg border-eggplant'>
            <p>{mockPayments.isReturned ? 'Returned' : 'Pending'}</p>
          </div>
          <div className='text-lg '>$121.00</div>
          {isCollapsed ? <ChevronDown className='shrink-0' /> : <ChevronUp className='shrink-0' />}
        </div>
      </div>
      {!isCollapsed
        ? mockPayments.lenderAmounts.map((user, index) => {
            return (
              <div key={index}>
                <div className='flex w-full h-16 px-3 justify-between '>
                  <div className='flex flex-col justify-center'>
                    <p>{user.user.name}</p>
                  </div>
                  <div className='flex flex-row h-full items-center space-x-6'>
                    <div className='flex w-32 h-10 pl-4 pr-2 items-center justify-between border border-eggplant rounded-lg space-x-2 hover:bg-eggplant/20'>
                      <p>{user.isReturned ? 'Returned' : 'Pending'}</p>
                      <ChevronDown className='shrink-0' />
                    </div>
                    <div className='w-28 text-lg pr-12'>{currencyFormatter.format(user.amount)}</div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
