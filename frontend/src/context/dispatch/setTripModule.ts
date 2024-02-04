import { TripSummary } from 'src/interfaces/TripSummary';
import { ADD_TRIP, IAppAction, SET_CURRENT_MODULE, SET_CURRENT_TRIP } from '../types';
import { Module } from 'src/interfaces/Module';

export const setCurrentTrip = (setAppState: React.Dispatch<IAppAction>) => {
  return (trip: TripSummary) => {
    setAppState({
      type: SET_CURRENT_TRIP,
      trip: trip,
    });
  };
};

export const addTrip = (setAppState: React.Dispatch<IAppAction>) => {
  return (trip: TripSummary) => {
    setAppState({
      type: ADD_TRIP,
      trip: trip,
    });
  };
};

export const setCurrentModule = (setAppState: React.Dispatch<IAppAction>) => {
  return (module: Module) => {
    setAppState({
      type: SET_CURRENT_MODULE,
      module: module,
    });
  };
};
