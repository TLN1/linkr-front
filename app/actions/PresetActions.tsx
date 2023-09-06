export const SET_APPLICATION_ID = "SET_APPLICATION_ID";
export const SET_SWITCH_STATE = "SET_SWITCH_STATE";

export const setApplicationId = (id: number | null) => ({
  type: SET_APPLICATION_ID,
  payload: id,
});

export const setSwitchState= (sw: boolean | null) => ({
  type: SET_SWITCH_STATE,
  payload: sw,
});