import { createAction, handleActions } from "redux-actions";

const CHANGE_ID = "login/CHANGE_ID";
const CHANGE_INPUT_ID = "login/CHANGE_INPUT_ID";
const CHANGE_INPUT_PW = "login/CHANGE_INPUT_PW";

const initState = {
  inputId: "",
  inputPw: "",
  id: !sessionStorage.getItem("loginId")
    ? null
    : sessionStorage.getItem("loginId"),
};

export const changeId = createAction(CHANGE_ID, (id) => id);
export const changeInputId = createAction(CHANGE_INPUT_ID, (text) => text);
export const changeInputPw = createAction(CHANGE_INPUT_PW, (text) => text);

const login = handleActions(
  {
    [CHANGE_INPUT_ID]: (state, action) => ({
      ...state,
      inputId: action.payload,
    }),
    [CHANGE_INPUT_PW]: (state, action) => ({
      ...state,
      inputPw: action.payload,
    }),
    [CHANGE_ID]: (state, action) => ({
      ...state,
      id: action.payload,
    }),
  },
  initState
);

export default login;
