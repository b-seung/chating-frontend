import { combineReducers } from "redux";
import login from "./login";
import header from "./header";
import loading from "./loading";

const rootReducer = combineReducers({ login, header, loading });

export default rootReducer;
