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
      payload: lists
     };
};


export const addList = (list) => {
    return {
       type: ActionTypes.ADD_LIST,
        payload: list
       };
  };
  

  export const archiveList = (lists) => {
    return {
       type: ActionTypes.ARCHIVE_LIST,
        payload: lists
       };
  };
   