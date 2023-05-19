import { combineReducers } from "redux";
import login from "./login";
import header from "./header";
import loading from "./loading";
import addFriend from "./addFriend";
import home from "./home";

const rootReducer = combineReducers({ login, header, loading, addFriend, home });

export default rootReducer;
