import { createContext, useReducer, ReactNode, useContext } from 'react';
import { appStateReducer, getAppStateDispatch } from './AppContextReducer';
import { AppStateReducers, IAppState } from './types';

export type IAppContext = [IAppState, AppStateReducers];

interface ProviderProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

const AppStateProvider = ({ children }: ProviderProps) => {
  const [appState, setAppState] = useReducer(appStateReducer, {
    currentTripModule: { trip: null, module: null },
  });

  const reducers = getAppStateDispatch(setAppState);

  return <AppContext.Provider value={[appState, reducers]}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppStateProvider');
  }
  return context;
};

export { AppContext, AppStateProvider, useAppContext };
