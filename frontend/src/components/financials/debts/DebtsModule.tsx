import { FC, useState } from 'react';
import { AddPaymentModal } from '../modals/AddPaymentModal';
import { RepayModal } from '../modals/RepayModal';

export const DebtsModule: FC = () => {
  const [isAddPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [isRepayModalOpen, setRepayModalOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <div className='h-16 w-full px-3 flex items-center border-b-2 border-gray-600 py-3 justify-between'>
          <div className='text-3xl h-10'>Outstanding Debts</div>
          <div className='space-x-3 '>
            <button
              onClick={() => setRepayModalOpen(true)}
              className='h-10 w-32 border rounded-md border-eggplant/20 bg-eggplant/50 hover:bg-eggplant text-white'
            >
              Repay
            </button>
            <AddPaymentModal
              isAddPaymentModalOpen={isAddPaymentModalOpen}
              setAddPaymentModalOpen={setAddPaymentModalOpen}
            />
            <RepayModal isRepayModalOpen={isRepayModalOpen} setRepayModalOpen={setRepayModalOpen} />
          </div>
        </div>
        <div className={`relative w-full h-full overflow-auto`}>
          <div className='absolute top-0 bot-0 left-0 right-0 flex flex-row py-3 px-3 h-full divide-x'>
            <div className='w-1/2 h-full px-3 flex flex-col'>
              <div className='w-24 h-10 bg-eggplant/50 rounded-t-md flex justify-center items-center'>
                <h2 className='text-white'>You Owe</h2>
              </div>

              <div className='w-full h-full border border-eggplant/20 rounded-b-md rounded-tr-md bg-eggplant/20'></div>
            </div>
            <div className='w-1/2 h-full px-3 flex flex-col'>
              <div className='w-24 h-10 bg-eggplant/50 rounded-t-md flex justify-center items-center'>
                <h2 className='text-white'>Owes You</h2>
              </div>

              <div className='w-full h-full border border-eggplant/20 rounded-b-md rounded-tr-md bg-eggplant/20'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
