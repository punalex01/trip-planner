import { ChevronDown, ChevronUp, CircleDollarSign, User, Users } from 'lucide-react';
import { useState, FC } from 'react';
import { useAppContext } from 'src/context/AppContext';
import { ModuleType } from 'src/global/constants';
import { isFinancialModuleType } from 'src/global/functions';

interface FinancialsButtonsProps {
  isSidebarCollapsed: boolean;
}

export const FinancialsSidebarButtons: FC<FinancialsButtonsProps> = ({ isSidebarCollapsed }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [{ currentTripModule }, { setCurrentModule }] = useAppContext();
  const currSelectedModule = currentTripModule.module;

  const moduleBackground =
    currSelectedModule !== null && isFinancialModuleType(currSelectedModule)
      ? ' bg-eggplant/20'
      : ' hover:bg-eggplant/20';

  const getGroupViewButtonBackground = (viewType: ModuleType) =>
    viewType === currSelectedModule ? ' bg-eggplant/20' : ' hover:bg-eggplant/20';

  // Edit border styling to make corners line up
  const buttonRoundedStyling = (isMainModuleButton: boolean) => {
    if (isMainModuleButton) {
      return !isCollapsed && currSelectedModule === ModuleType.FINANCIALS_INDIVIDUAL_BALANCES
        ? ' rounded-t-lg'
        : ' rounded-lg';
    } else {
      return currSelectedModule === ModuleType.FINANCIALS_INDIVIDUAL_BALANCES ? ' rounded-b-lg' : ' rounded-lg';
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
                setCurrentModule(ModuleType.FINANCIALS_INDIVIDUAL_BALANCES);
              }}
              className={
                'h-10 w-full flex justify-center items-center hover:cursor-pointer' +
                getGroupViewButtonBackground(ModuleType.FINANCIALS_INDIVIDUAL_BALANCES) +
                buttonRoundedStyling(false)
              }
            >
              <User className='shrink-0' />
            </div>
            <div
              onClick={() => {
                setCurrentModule(ModuleType.FINANCIALS_GROUP_PAYMENTS);
              }}
              className={
                'h-10 w-full rounded-lg flex justify-center items-center hover:cursor-pointer' +
                getGroupViewButtonBackground(ModuleType.FINANCIALS_GROUP_PAYMENTS)
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
              setCurrentModule(ModuleType.FINANCIALS_INDIVIDUAL_BALANCES);
            }}
            className={
              'flex grow h-10 w-full pl-8 pr-2 space-x-2 items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(ModuleType.FINANCIALS_INDIVIDUAL_BALANCES) +
              buttonRoundedStyling(false)
            }
          >
            <User />
            <h2 className='grow line-clamp-1'>Individual</h2>
          </div>
          <div
            onClick={() => {
              setCurrentModule(ModuleType.FINANCIALS_GROUP_PAYMENTS);
            }}
            className={
              'flex grow h-10 w-full pl-8 pr-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
              getGroupViewButtonBackground(ModuleType.FINANCIALS_GROUP_PAYMENTS)
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
