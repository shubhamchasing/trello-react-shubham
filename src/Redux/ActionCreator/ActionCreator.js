import { ActionTypes } from "../Actions/Actions";

export const getBoards = (boards) => {

    console.log("get",boards)
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
