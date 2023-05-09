import { combineReducers } from "redux";
import login from "./login";
import header from "./header";

const rootReducer = combineReducers({ login, header });

export default rootReducer;
