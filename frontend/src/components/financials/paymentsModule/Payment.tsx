import { ChevronDown, ChevronUp } from 'lucide-react';
import { FC, useState } from 'react';
import { mockPayment1 } from '../../../mocks/payments';
import { currencyFormatter } from 'src/global/functions';
import { format } from 'date-fns';
import { IUser } from 'src/interfaces/User';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shadcn/components/ui/select';

interface PaymentProps {}

export const Payment: FC<PaymentProps> = () => {
  const [isCollapsed, setCollapsed] = useState(false);

  const [payments, setPayments] = useState(mockPayment1);

  // TODO - Call update API request instead of just updating in frontend
  const setUserReturnStatus = (lender: IUser, isReturned: boolean) => {
    const currLendeeAmount = payments.lendeeAmounts.find((lendeeAmount) => lendeeAmount.user === lender);
    if (currLendeeAmount) {
      currLendeeAmount.isReturned = isReturned;
    }
    const tempLendeeAmounts = payments.lendeeAmounts;
    tempLendeeAmounts.map((lendeeAmount) =>
      lendeeAmount.user === currLendeeAmount?.user ? currLendeeAmount : lendeeAmount
    );
    setPayments({
      ...payments,
      lendeeAmounts: tempLendeeAmounts,
    });
  };

  return (
    <div className='w-full border border-eggplant rounded-lg divide-y divide-eggplant'>
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={'flex w-full h-20 px-3 justify-between hover:cursor-pointer hover:bg-eggplant/20'}
      >
        <div className='flex flex-col justify-center'>
          <p className='text-lg'>
            {payments.name} | {format(payments.date, 'MM/dd/yyyy')}
          </p>
          <p className='italic'>{payments.lender.name}</p>
        </div>
        <div className='flex flex-row h-full items-center space-x-6'>
          <div className='flex w-32 h-10 px-4 justify-center items-center border rounded-lg border-eggplant'>
            <p>{payments.isReturned ? 'Returned' : 'Pending'}</p>
          </div>
          <div className='text-lg '>$121.00</div>
          {isCollapsed ? <ChevronDown className='shrink-0' /> : <ChevronUp className='shrink-0' />}
        </div>
      </div>
      {!isCollapsed
        ? payments.lendeeAmounts.map((user, index) => {
            return (
              <div key={index}>
                <div className='flex w-full h-16 px-3 justify-between '>
                  <div className='flex flex-col justify-center'>
                    <p>{user.user.name}</p>
                  </div>
                  <div className='flex flex-row h-full items-center space-x-6'>
                    {/* <div className='flex w-32 h-10 pl-4 pr-2 items-center justify-between border border-eggplant rounded-lg space-x-2 hover:bg-eggplant/20'> */}
                    <Select
                      key={index}
                      defaultValue={user.isReturned ? 'Returned' : 'Pending'}
                      onValueChange={(value) => setUserReturnStatus(user.user, value === 'Returned' ? true : false)}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder={'Pending'} />
                      </SelectTrigger>
                      <SelectContent position='popper' avoidCollisions={false}>
                        <SelectItem value={'Pending'}>Pending</SelectItem>
                        <SelectItem value={'Returned'}>Returned</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* </div> */}
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
