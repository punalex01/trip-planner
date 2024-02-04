import { Module } from 'src/interfaces/Module';
import { TripSummary } from 'src/interfaces/TripSummary';

export interface IAppState {
  currTripModule: {
    trip: TripSummary | null;
    module: Module | null;
  };
}

export interface IAppAction {
  type: string;
  trip?: TripSummary;
  module?: Module;
}

// Actions
export const SET_CURRENT_TRIP = 'SET CURRENT TRIP CONTEXT';
export const SET_CURRENT_MODULE = 'SET CURRENT MODULE CONTEXT';
