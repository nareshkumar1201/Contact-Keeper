import { SHOW_ALERT, REMOVE_ALERT } from "./types";
// export default (state, action)
const AlertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default AlertReducer;
