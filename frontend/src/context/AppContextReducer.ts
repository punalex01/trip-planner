import { setCurrentModule, setCurrentTrip } from './dispatch/setTripModule';
import { IAppAction, IAppState, SET_CURRENT_MODULE, SET_CURRENT_TRIP } from './types';

export function appStateReducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case SET_CURRENT_TRIP:
      return {
        ...state,
        currentTripModule: {
          trip: action.trip,
          module: action.module,
        },
      } as IAppState;
    case SET_CURRENT_MODULE:
      return {
        ...state,
        currentTripModule: {
          trip: state.currentTripModule.trip,
          module: action.module,
        },
      } as IAppState;
    default:
      return state;
  }
}

// Consolidate all abstracted dispatch functions into one object
export const getAppStateDispatch = (setAppState: React.Dispatch<IAppAction>) => ({
  setCurrentTrip: setCurrentTrip(setAppState),
  setCurrentModule: setCurrentModule(setAppState),
});
