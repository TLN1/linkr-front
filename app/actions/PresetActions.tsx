export const SET_APPLICATION_ID = "SET_APPLICATION_ID";

export const setApplicationId = (id: number | null) => ({
  type: SET_APPLICATION_ID,
  payload: id,
});
