import { TripSummary } from 'src/interfaces/TripSummary';
import { ADD_TRIP, IAppAction, SET_CURRENT_TRIP } from '../types';

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
