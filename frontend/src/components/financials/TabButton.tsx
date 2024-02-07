import { Dispatch, FC, SetStateAction } from 'react';
import { GroupFinancialsTab } from 'src/global/constants';

interface FinancialsTabButtonProps {
  selectedTab: GroupFinancialsTab;
  setTab: Dispatch<SetStateAction<GroupFinancialsTab>>;
  tabValue: GroupFinancialsTab;
  label: string;
}

export const FinancialsTabButton: FC<FinancialsTabButtonProps> = ({ selectedTab, setTab, tabValue, label }) => {
  const bg = selectedTab === tabValue ? ' bg-eggplant/20' : ' hover:bg-eggplant/20';

  return (
    <button onClick={() => setTab(tabValue)} className={'h-10 w-24 border rounded-md border-eggplant/20' + bg}>
      {label}
    </button>
  );
};
