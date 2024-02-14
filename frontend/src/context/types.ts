import { ModuleType } from 'src/global/constants';
import { TripSummary } from 'src/interfaces/TripSummary';

export interface IAppState {
  currentTripModule: ITripModule;
}

export interface IAppAction {
  type: string;
  trip?: TripSummary;
  module?: ModuleType;
}

export interface ITripModule {
  trip: TripSummary | null;
  module: ModuleType | null;
}

// Actions
export const SET_CURRENT_TRIP = 'SET CURRENT TRIP CONTEXT';
export const SET_CURRENT_MODULE = 'SET CURRENT MODULE CONTEXT';
export const ADD_TRIP = 'ADD TRIP CONTEXT';

export interface AppStateReducers {
  setCurrentTrip: (trip: TripSummary) => void;
  setCurrentModule: (module: ModuleType) => void;
}
