import { createAction, handleActions } from "redux-actions";

const SET_FRIEND_LIST = "home/SET_FRIEND_LIST";
const SET_CHAT_LIST = "home/SET_CHAT_LIST";

const initialState = {
  friendList: new Array(),
  chatList: new Array(),
};

export const setFriendList = createAction(SET_FRIEND_LIST, (list) => list);
export const setChatList = createAction(SET_CHAT_LIST, (list) => list);

const home = handleActions(
  {
    [SET_FRIEND_LIST]: (state, action) => ({
      ...state,
      friendList: action.payload,
    }),
    [SET_CHAT_LIST]: (state, action) => ({
      ...state,
      chatList: action.payload,
    }),
  },
  initialState
);

export default home;
