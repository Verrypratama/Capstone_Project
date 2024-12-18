import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { newsReducer } from "./reducers/redux.service.jsx";

const store = createStore(newsReducer, applyMiddleware(thunk));

export default store;
