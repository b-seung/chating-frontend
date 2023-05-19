import { createAction, handleActions } from "redux-actions";

const SET_FRIEND_LIST = "home/SET_FRIEND_LIST";
const SET_CHATING_LIST = "home/SET_CHATING_LIST";

const initialState = {
  friendList: new Array(),
  chatingList: new Array(),
};

export const setFriendList = createAction(SET_FRIEND_LIST, (list) => list);
export const setChatingList = createAction(SET_CHATING_LIST, (list) => list);

const home = handleActions(
  {
    [SET_FRIEND_LIST]: (state, action) => ({
      ...state,
      friendList: action.payload,
    }),
    [SET_CHATING_LIST]: (state, action) => ({
      ...state,
      chatingList: action.payload,
    }),
  },
  initialState
);

export default home;
