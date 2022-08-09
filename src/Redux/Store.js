import { createStore } from "redux";
import {boardsReducer} from './Reducer/Reducer';

const store = createStore(boardsReducer,{});

export default store;

