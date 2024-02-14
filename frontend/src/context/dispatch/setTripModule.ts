import { TripSummary } from 'src/interfaces/TripSummary';
import { ADD_TRIP, IAppAction, SET_CURRENT_MODULE, SET_CURRENT_TRIP } from '../types';
import { ModuleType } from 'src/global/constants';

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
  return (module: ModuleType) => {
    setAppState({
      type: SET_CURRENT_MODULE,
      module: module,
    });
  };
};
