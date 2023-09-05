import { SET_APPLICATION_ID } from "../actions/PresetActions";

const initialState = {
  jobApplicationId: null
};

const presetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPLICATION_ID:
      return {
        ...state,
        jobApplicationId: action.payload,
      };
    default:
      return state;
  }
};

export default presetReducer;
