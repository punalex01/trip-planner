import { setCurrentModule, setCurrentTrip, setGroupViewType } from './dispatch/setTripModule';
import { GroupViewType, IAppAction, IAppState, SET_CURRENT_MODULE, SET_CURRENT_TRIP, SET_GROUP_VIEW } from './types';

export function appStateReducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case SET_CURRENT_TRIP:
      return {
        ...state,
        currentTripModule: {
          trip: action.trip,
          module: null,
          viewType: GroupViewType.INDIVIDUAL_VIEW,
        },
      } as IAppState;
    case SET_CURRENT_MODULE:
      return {
        ...state,
        currentTripModule: {
          trip: state.currentTripModule.trip,
          module: action.module,
          viewType: GroupViewType.INDIVIDUAL_VIEW,
        },
      } as IAppState;
    case SET_GROUP_VIEW:
      return {
        ...state,
        currentTripModule: {
          ...state.currentTripModule,
          viewType: action.viewType,
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
  setGroupViewType: setGroupViewType(setAppState),
});
