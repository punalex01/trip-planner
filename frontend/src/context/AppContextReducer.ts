import { setCurrentTrip } from './dispatch/setTripModule';
import { IAppAction, IAppState, SET_CURRENT_TRIP } from './types';

export function appStateReducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case SET_CURRENT_TRIP:
      return {
        ...state,
        currentTripModule: {
          trip: action.trip,
        },
      } as IAppState;
    default:
      return state;
  }
}

// Consolidate all abstracted dispatch functions into one object
export const getAppStateDispatch = (setAppState: React.Dispatch<IAppAction>) => ({
  setCurrentTrip: setCurrentTrip(setAppState),
});
