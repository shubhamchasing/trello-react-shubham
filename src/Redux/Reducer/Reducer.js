import { ActionTypes } from "../Actions/Actions";

const intialState = {
  boards: [],
  lists: [],
};

export const boardsReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };

    case ActionTypes.CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };

    case ActionTypes.GET_LISTS:
      return {
        ...state,
        lists: action.payload,
      };

    case ActionTypes.ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };

      case ActionTypes.ARCHIVE_LIST:
        return {
          ...state,
          lists: action.payload,
        };

    default:
      return state;
  }
};
 