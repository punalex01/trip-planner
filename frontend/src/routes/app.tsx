import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import { AppStateProvider } from 'src/context/AppContext';

export const App: FC = () => {
  return (
    <>
      <AppStateProvider>
        <Outlet />
      </AppStateProvider>
    </>
  );
};
