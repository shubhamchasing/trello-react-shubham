import { ActionTypes } from "../Actions/Actions";

export const getBoards = (boards) => {
  return {
    type: ActionTypes.GET_BOARDS,
    payload: boards,
  };
};

export const createBoard = (board) => {
  return {
    type: ActionTypes.CREATE_BOARD,
    payload: board,
  };
};

export const getLists = (lists) => {
  return {
    type: ActionTypes.GET_LISTS,
    payload: lists,
  };
};

export const addList = (list) => {
  return {
    type: ActionTypes.ADD_LIST,
    payload: list,
  };
};

export const archiveList = (lists) => {
  return {
    type: ActionTypes.ARCHIVE_LIST,
    payload: lists,
  };
};

export const getCards = ({ cards, listId }) => {
  return {
    type: ActionTypes.GET_CARDS,
    payload: { cards, listId },
  };
};

export const addCard = ({ card, listId }) => {
  console.log("action", card,listId)
  return {
    type: ActionTypes.ADD_CARD,
    payload: { card, listId },
  };
};

export const deleteCard = ({ remainingCards, listId }) => {
  return {
    type: ActionTypes.DELETE_CARD,
    payload: { remainingCards, listId },
  };
};
