import { IAppAction, IAppState, SET_CURRENT_MODULE, SET_CURRENT_TRIP } from './types';

export default function appStateReducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case SET_CURRENT_TRIP:
      return {
        currentTripModule: {
          trip: action.trip,
          module: action.module,
        },
        ...state,
      };
    case SET_CURRENT_MODULE:
      return {
        currentTripModule: {
          trip: state.currTripModule.trip,
          module: action.module,
        },
        ...state,
      };
    default:
      return state;
  }
}
