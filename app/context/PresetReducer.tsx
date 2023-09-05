import { SET_APPLICATION_ID, SET_SWITCH_STATE } from "../actions/PresetActions";

const initialState = {
  jobApplicationId: null,
  switchState: null
};

const presetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPLICATION_ID:
      return {
        ...state,
        jobApplicationId: action.payload,
      };
      case SET_SWITCH_STATE:
      return {
        ...state,
        switchState: action.payload,
      };
    default:
      return state;
  }
};

export default presetReducer;
