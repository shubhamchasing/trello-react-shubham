import { ActionTypes } from "../Actions/Actions";

const intialState = {
  boards: [],
};

export const boardsReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
      
    case ActionTypes.CREATE_BOARD:
      return {};

    default:
      return state;
  }
};
