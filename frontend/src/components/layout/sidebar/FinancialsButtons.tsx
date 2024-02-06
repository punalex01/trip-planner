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

  // Edit border styling to make corners line up
  const buttonRoundedStyling = (isMainModuleButton: boolean) => {
    if (isMainModuleButton) {
      return groupView === GroupViewType.INDIVIDUAL_VIEW ? ' rounded-t-lg' : ' rounded-lg';
    } else {
      return groupView === GroupViewType.INDIVIDUAL_VIEW ? ' rounded-b-lg' : ' rounded-lg';
    }
  };

  if (isSidebarCollapsed) {
    return (
      <div className='border border-eggplant/20 rounded-xl'>
        <div
          onClick={() => setCollapsed(!isCollapsed)}
          className={
            'h-10 w-full flex justify-center items-center hover:cursor-pointer' +
            moduleBackground +
            buttonRoundedStyling(true)
          }
        >
          <CircleDollarSign className='shrink-0' />
        </div>
        {!isCollapsed ? (
          <div>
            <div
              onClick={() => {
                setCurrentModule(module);
                setGroupViewType(GroupViewType.INDIVIDUAL_VIEW);
              }}
              className={
                'h-10 w-full flex justify-center items-center hover:cursor-pointer' +
                getGroupViewButtonBackground(GroupViewType.INDIVIDUAL_VIEW) +
                buttonRoundedStyling(false)
              }
            >
              <User className='shrink-0' />
            </div>
            <div
              onClick={() => {
                setCurrentModule(module);
                setGroupViewType(GroupViewType.GROUP_VIEW);
              }}
              className={
                'h-10 w-full rounded-lg flex justify-center items-center hover:cursor-pointer' +
                getGroupViewButtonBackground(GroupViewType.GROUP_VIEW)
              }
            >
              <Users className='shrink-0' />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className='border border-eggplant/20 rounded-xl'>
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={
          'flex grow h-10 w-full px-2 space-x-2 items-center hover:cursor-pointer overflow-clip line-clamp-1' +
          moduleBackground +
          buttonRoundedStyling(true)
        }
      >
        <CircleDollarSign />
        <h2 className='grow line-clamp-1'>Financials</h2>
        {isCollapsed ? <ChevronDown /> : <ChevronUp />}
      </div>
      {!isCollapsed ? (
        <div>
          <div
            onClick={() => {
              setCurrentModule(module);
              setGroupViewType(GroupViewType.INDIVIDUAL_VIEW);
            }}
            className={
              'flex grow h-10 w-full pl-8 pr-2 space-x-2 items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(GroupViewType.INDIVIDUAL_VIEW) +
              buttonRoundedStyling(false)
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
              'flex grow h-10 w-full pl-8 pr-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(GroupViewType.GROUP_VIEW)
            }
          >
            <Users />
            <h2 className='grow line-clamp-1'>Group</h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};
