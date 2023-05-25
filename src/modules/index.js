import { combineReducers } from "redux";
import login from "./login";
import header from "./header";
import loading from "./loading";
import addFriend from "./addFriend";
import database from "./database";

const rootReducer = combineReducers({ login, header, loading, addFriend, database });

export default rootReducer;
