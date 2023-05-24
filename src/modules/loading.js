import { createAction, handleActions } from "redux-actions";

const CHANGE_LOADING_STATE = "loading/CHANGE_LOADING_STATE";
const CONNECT_WEBSOCKET = "loading/CONNECT_WEBSOCKET";

const initialState = {
  loadingState: false,
  connectState: false,
};

export const changeLoadingState = createAction(CHANGE_LOADING_STATE, (value) => value);
export const changeConnectState = createAction(CONNECT_WEBSOCKET, (value) => value);
const loading = handleActions(
  {
    [CHANGE_LOADING_STATE]: (state, action) => ({
      ...state,
      loadingState: action.payload,
    }),
    [CONNECT_WEBSOCKET]: (state, action) => ({
      ...state,
      connectState: action.payload,
    }),
  },
  initialState
);

export default loading;
