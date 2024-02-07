import { FC } from 'react';
import { Payment } from './Payment';

interface PaymentsTabProps {}

export const PaymentsTab: FC<PaymentsTabProps> = () => {
  return (
    <div className={`relative w-full h-full overflow-auto`}>
      <div className='absolute top-0 bot-0 left-0 right-0 flex flex-row flex-wrap py-3 px-3'>
        <Payment />
      </div>
    </div>
  );
};
