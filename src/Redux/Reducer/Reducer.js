import { ActionTypes } from "../Actions/Actions";

const intialState = {
  boards: [],
  lists: [],
  cardsInList: {},
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

    case ActionTypes.GET_CARDS:
      return {
        ...state,
        cardsInList: {
          ...state.cardsInList,
          [action.payload.listId]: action.payload.cards,
        },
      };
  
    case ActionTypes.ADD_CARD:
      return {
        ...state,
        cardsInList: {
          ...state.cardsInList,
          [action.payload.listId]: [
            ...state.cardsInList[action.payload.listId],
            action.payload.card,
          ],
        },
      };

    case ActionTypes.DELETE_CARD:
      return {
        ...state,
        cardsInList: {
          ...state.cardsInList,
          [action.payload.listId]: action.payload.remainingCards,
        },
      };

    default:
      return state;
  }
};
