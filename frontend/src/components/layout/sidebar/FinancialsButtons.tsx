import { ChevronDown, ChevronUp, CircleDollarSign, User, Users } from 'lucide-react';
import { useState, FC } from 'react';
import { useAppContext } from 'src/context/AppContext';
import { GroupViewType } from 'src/context/types';
import { Module } from 'src/interfaces/Module';

interface FinancialsButtonsProps {
  isSidebarCollapsed: boolean;
  module: Module;
}

export const FinancialsButtons: FC<FinancialsButtonsProps> = ({ isSidebarCollapsed, module }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [{ currentTripModule }, { setCurrentModule, setGroupViewType }] = useAppContext();
  const currSelectedModule = currentTripModule.module;
  const groupView = currentTripModule.viewType;

  const moduleBackground =
    currSelectedModule && currSelectedModule.id === module.id ? ' bg-eggplant/20' : ' hover:bg-eggplant/20';

  const getGroupViewButtonBackground = (viewType: GroupViewType) => {
    if (currSelectedModule === null || currSelectedModule.id !== module.id || groupView === null) {
      return ' hover:bg-eggplant/20';
    } else if (groupView === viewType) {
      return ' bg-eggplant/20';
    }
  };

  if (!isCollapsed) {
    return (
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={
          'flex grow h-10 w-full px-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
          moduleBackground
        }
      >
        <CircleDollarSign />
        <h2 className='grow line-clamp-1'>Financials</h2>
        <ChevronDown />
      </div>
    );
  } else {
    return (
      <div>
        <div
          onClick={() => setCollapsed(!isCollapsed)}
          className={
            'flex grow h-10 w-full px-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
            moduleBackground
          }
        >
          <CircleDollarSign />
          <h2 className='grow line-clamp-1'>Financials</h2>
          <ChevronUp />
        </div>
        <div className='pl-6'>
          <div
            onClick={() => {
              setCurrentModule(module);
              setGroupViewType(GroupViewType.INDIVIDUAL_VIEW);
            }}
            className={
              'flex grow h-10 w-full px-2 space-x-2 rounded-b-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(GroupViewType.INDIVIDUAL_VIEW)
            }
          >
            <User />
            <h2 className='grow line-clamp-1'>Individual</h2>
          </div>
          <div
            onClick={() => {
              setCurrentModule(module);
              setGroupViewType(GroupViewType.GROUP_VIEW);
            }}
            className={
              'flex grow h-10 w-full px-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(GroupViewType.GROUP_VIEW)
            }
          >
            <Users />
            <h2 className='grow line-clamp-1'>Group</h2>
          </div>
        </div>
      </div>
    );
  }
};
