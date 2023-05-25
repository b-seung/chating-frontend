import { createAction, handleActions } from "redux-actions";

const SET_FRIEND_LIST = "home/SET_FRIEND_LIST";
const SET_CHAT_LIST = "home/SET_CHAT_LIST";

const SET_MESSAGES = "home/SET_MESSAGES";
const ADD_MESSAGES = "home/ADD_MESSAGES";
const CHANGE_SENDED = "home/CHANGE_SENDED";

const initialState = {
  friendList: new Array(),
  chatList: new Array(),
  messages: new Array(),
};

export const setFriendList = createAction(SET_FRIEND_LIST, (list) => list);
export const setChatList = createAction(SET_CHAT_LIST, (list) => list);

export const setMessages = createAction(SET_MESSAGES, (list) => list);
export const addMessage = createAction(ADD_MESSAGES, (message) => message);
export const changeSended = createAction(CHANGE_SENDED, (time) => time);

const database = handleActions(
  {
    [SET_FRIEND_LIST]: (state, action) => ({
      ...state,
      friendList: action.payload,
    }),
    [SET_CHAT_LIST]: (state, action) => ({
      ...state,
      chatList: action.payload,
    }),
    [SET_MESSAGES]: (state, action) => ({
      ...state,
      messages: action.payload,
    }),
    [ADD_MESSAGES]: (state, action) => ({
      ...state,
      messages: state.messages.concat(action.payload),
    }),
    [CHANGE_SENDED]: (state, action) => ({
      ...state,
      messages: state.messages.map((message) =>
        message.sended_time === action.payload ? { ...message, sended: true } : message
      ),
    }),
  },
  initialState
);

export default database;
