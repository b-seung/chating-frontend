import { createAction, handleActions } from "redux-actions";

const CHANGE_LOADING_STATE = "loading/CHANGE_LOADING_STATE";

const initialState = {
  loadingState: false,
};

export const changeLoadingState = createAction(CHANGE_LOADING_STATE, (value) => value);

const loading = handleActions(
  {
    [CHANGE_LOADING_STATE]: (state, action) => ({
      ...state,
      loadingState: action.payload,
    }),
  },
  initialState
);

export default loading;
