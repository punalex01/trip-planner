import { createContext, useReducer, ReactNode } from 'react';
import appStateReducer from './AppContextReducer';
import { IAppAction, IAppState } from './types';

export type IAppContext = [IAppState, React.Dispatch<IAppAction>];

interface ProviderProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContext>([
  {
    currTripModule: { trip: null, module: null },
  },
  () => null,
]);

const AppStateProvider = ({ children }: ProviderProps) => {
  const [appState, setAppState] = useReducer(appStateReducer, {
    currTripModule: { trip: null, module: null },
  });

  return <AppContext.Provider value={[appState, setAppState]}>{children}</AppContext.Provider>;
};

export { AppContext, AppStateProvider };
