import { FC, useState } from 'react';
import { FinancialsTabButton } from '../TabButton';
import { GroupFinancialsTab } from 'src/global/constants';
import { PaymentsTab } from '../PaymentsTab';

export const GroupFinancials: FC = () => {
  const [selectedTab, setSelectedTab] = useState(GroupFinancialsTab.FINANCIALS_GROUP_PAYMENTS_TAB);

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <div className='h-16 w-full px-3 flex items-center border-b-2 border-gray-600 py-3 justify-between'>
          <div className='text-3xl h-10'>Financials</div>
          <div className='space-x-3 '>
            <FinancialsTabButton
              selectedTab={selectedTab}
              setTab={setSelectedTab}
              tabValue={GroupFinancialsTab.FINANCIALS_GROUP_PAYMENTS_TAB}
              label={'Payments'}
            />
            <FinancialsTabButton
              selectedTab={selectedTab}
              setTab={setSelectedTab}
              tabValue={GroupFinancialsTab.FINANCIALS_GROUP_LENDING_TAB}
              label={'Lending'}
            />
          </div>
        </div>
        <PaymentsTab />
      </div>
    </>
  );
};
