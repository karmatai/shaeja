import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

// Redusers
import appReducer from "./reducer";

const rootReducer = combineReducers({
    app: appReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;