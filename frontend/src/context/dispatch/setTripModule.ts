import { TripSummary } from 'src/interfaces/TripSummary';
import { ADD_TRIP, GroupViewType, IAppAction, SET_CURRENT_MODULE, SET_CURRENT_TRIP, SET_GROUP_VIEW } from '../types';
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

export const setGroupViewType = (setAppState: React.Dispatch<IAppAction>) => {
  return (viewType: GroupViewType) => {
    setAppState({
      type: SET_GROUP_VIEW,
      viewType: viewType,
    });
  };
};
