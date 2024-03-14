import { FC } from 'react';
import { columns } from './Columns';
import { mockIndividualPayments } from 'src/mocks/individualPayments';
import { DataTable } from './DataTable';

export const IndividualBalancesModule: FC = () => {
  const individualPayments = mockIndividualPayments;
  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <div className='h-16 w-full px-3 flex items-center border-b-2 border-gray-600 py-3 justify-between'>
          <div className='text-3xl h-10'>Individual Balance</div>
        </div>
        <div className={`relative w-full h-full overflow-auto`}>
          <div className='absolute top-0 bot-0 left-0 right-0 flex flex-row py-3 px-3 h-full w-full'>
            <DataTable columns={columns} data={individualPayments} />
          </div>
        </div>
      </div>
    </>
  );
};
