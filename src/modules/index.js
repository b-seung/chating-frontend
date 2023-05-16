import { combineReducers } from "redux";
import login from "./login";
import header from "./header";
import loading from "./loading";
import addFriend from "./addFriend";

const rootReducer = combineReducers({ login, header, loading, addFriend });

export default rootReducer;
