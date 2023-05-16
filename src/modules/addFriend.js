import { createAction, handleActions } from "redux-actions";

const SET_MY_FRIEND_LIST = "addFriend/SET_MY_FRIEND_LIST";
const ADD_MY_FRIEND_LIST = "addFriend/ADD_MY_FRIEND_LIST";
const REMOVE_MY_FRIEND_LIST = "addFriend/REMOVE_MY_FRIEND_LIST";
const SET_ADDED_ME_LIST = "addFriend/SET_ADDED_ME_LIST";
const ADD_ADDED_ME_LIST = "addFriend/ADD_ADDED_ME_LIST";
const REMOVE_ADDED_ME_LIST = "addFriend/REMOVE_ADDED_ME_LIST";

const IS_ME = "addFriend/IS_ME";
const IS_ADDED = "ddFriend/IS_ADDED";

const initState = {
  myFriendList: null,
  addedMeList: null,
  isMe: false,
  isAdded: false,
};

export const setMyList = createAction(SET_MY_FRIEND_LIST, (array) => array);
export const addMyList = createAction(ADD_MY_FRIEND_LIST, (data) => data);
export const removeMyList = createAction(REMOVE_MY_FRIEND_LIST, (data) => data);
export const setAddedList = createAction(SET_ADDED_ME_LIST, (array) => array);
export const addAddedList = createAction(ADD_ADDED_ME_LIST, (id) => id);
export const removeAddedList = createAction(REMOVE_ADDED_ME_LIST, (id) => id);

export const setIsMe = createAction(IS_ME, (value) => value);
export const setIsAdded = createAction(IS_ADDED, (value) => value);

const addFriend = handleActions(
  {
    [SET_MY_FRIEND_LIST]: (state, action) => ({
      ...state,
      myFriendList: action.payload,
    }),
    [ADD_MY_FRIEND_LIST]: (state, action) => ({
      ...state,
      myFriendList: state.myFriendList.concat(action.payload),
    }),
    [REMOVE_MY_FRIEND_LIST]: (state, action) => ({
      ...state,
      myFriendList: state.myFriendList.filter((list) => list.id !== action.payload.id),
    }),
    [SET_ADDED_ME_LIST]: (state, action) => ({
      ...state,
      addedMeList: action.payload,
    }),
    [ADD_ADDED_ME_LIST]: (state, action) => ({
      ...state,
      addedMeList: state.addedMeList.concat(action.payload),
    }),
    [REMOVE_ADDED_ME_LIST]: (state, action) => ({
      ...state,
      addedMeList: state.addedMeList.filter((list) => list["id"] !== action.payload),
    }),
    [IS_ME]: (state, action) => ({
      ...state,
      isMe: action.payload,
    }),
    [IS_ADDED]: (state, action) => ({
      ...state,
      isAdded: action.payload,
    }),
  },
  initState
);

export default addFriend;
