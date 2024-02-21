import { TripSummary } from 'src/interfaces/TripSummary';

export interface IAppState {
  currentTripModule: ITripModule;
}

export interface IAppAction {
  type: string;
  trip?: TripSummary;
}

export interface ITripModule {
  trip: TripSummary | null;
}

// Actions
export const SET_CURRENT_TRIP = 'SET CURRENT TRIP CONTEXT';
export const ADD_TRIP = 'ADD TRIP CONTEXT';

export interface AppStateReducers {
  setCurrentTrip: (trip: TripSummary) => void;
}
