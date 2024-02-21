import { ChevronDown, ChevronUp, CircleDollarSign, User, Users } from 'lucide-react';
import { useState, FC } from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

interface FinancialsButtonsProps {
  isSidebarCollapsed: boolean;
}

export const FinancialsSidebarButtons: FC<FinancialsButtonsProps> = ({ isSidebarCollapsed }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const currPath = useLocation().pathname;

  const getGroupViewButtonBackground = (isActive: boolean) =>
    isSidebarCollapsed
      ? `h-10 w-full flex justify-center items-center hover:cursor-pointer ${isActive ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'}`
      : `flex grow h-10 w-full pl-8 pr-2 space-x-2 items-center hover:cursor-pointer overflow-clip line-clamp-1 ${isActive ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'}`;

  // // Edit border styling to make corners line up
  // const buttonRoundedStyling = (isMainModuleButton: boolean) => {
  //   if (isMainModuleButton) {
  //     return !isCollapsed && currSelectedModule === ModuleType.FINANCIALS_INDIVIDUAL_BALANCES
  //       ? ' rounded-t-lg'
  //       : ' rounded-lg';
  //   } else {
  //     return currSelectedModule === ModuleType.FINANCIALS_INDIVIDUAL_BALANCES ? ' rounded-b-lg' : ' rounded-lg';
  //   }
  // };

  if (isSidebarCollapsed) {
    return (
      <div className='border border-eggplant/20'>
        <div
          onClick={() => setCollapsed(!isCollapsed)}
          className={`h-10 w-full flex justify-center items-center hover:cursor-pointer ${
            matchPath('/financials/*', currPath) ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'
          }`}
        >
          <CircleDollarSign className='shrink-0' />
        </div>
        {!isCollapsed ? (
          <div>
            <NavLink to='/financials/individual' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
              <User className='shrink-0' />
            </NavLink>
            <NavLink to='/financials/debts' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
              <Users className='shrink-0' />
            </NavLink>
            <NavLink to='/financials/payments' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
              <Users className='shrink-0' />
            </NavLink>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className='border border-eggplant/20'>
      <div
        onClick={() => setCollapsed(!isCollapsed)}
        className={`flex grow h-10 w-full px-2 space-x-2 items-center hover:cursor-pointer overflow-clip line-clamp-1
          ${matchPath('/financials/*', currPath) ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'}`}
      >
        <CircleDollarSign />
        <h2 className='grow line-clamp-1'>Financials</h2>
        {isCollapsed ? <ChevronDown /> : <ChevronUp />}
      </div>
      {!isCollapsed ? (
        <div>
          <NavLink to='/financials/individual' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
            <User className='shrink-0' />
            <h2 className='grow line-clamp-1'>Individual</h2>
          </NavLink>
          <NavLink to='/financials/debts' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
            <Users className='shrink-0' />
            <h2 className='grow line-clamp-1'>Debts</h2>
          </NavLink>
          <NavLink to='/financials/payments' className={({ isActive }) => getGroupViewButtonBackground(isActive)}>
            <Users className='shrink-0' />
            <h2 className='grow line-clamp-1'>Payments</h2>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};
