import { createAction, handleActions } from "redux-actions";

const CHANGE_ID = "login/CHANGE_ID";
const CHANGE_PW = "login/CHANGE_PW";

const initState = {
  id: "",
  password: "",
};

export const changeId = createAction(CHANGE_ID, (id) => id);
export const changePw = createAction(CHANGE_PW, (pw) => pw);

const login = handleActions(
  {
    [CHANGE_ID]: (state, action) => ({
      ...state,
      id: action.payload,
    }),
    [CHANGE_PW]: (state, action) => ({
      ...state,
      pw: action.payload,
    }),
  },
  initState
);

export default login;
