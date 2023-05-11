import { createAction, handleActions } from "redux-actions";

const LOGIN_STATE = "login/LOGIN_STATE";
const CHANGE_INPUT_ID = "login/CHANGE_INPUT_ID";
const CHANGE_INPUT_PW = "login/CHANGE_INPUT_PW";
const RESET_INPUT = "login/RESET_INPUT";

const initState = {
  inputId: "",
  inputPw: "",
  loginState: false,
};

export const setLoginState = createAction(LOGIN_STATE, (value) => value);
export const changeInputId = createAction(CHANGE_INPUT_ID, (text) => text);
export const changeInputPw = createAction(CHANGE_INPUT_PW, (text) => text);
export const resetInput = createAction(RESET_INPUT, () => {});

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
    [LOGIN_STATE]: (state, action) => ({
      ...state,
      loginState: action.payload,
    }),
    [RESET_INPUT]: (state, action) => ({
      ...state,
      inputId: "",
      inputPw: "",
    }),
  },
  initState
);

export default login;
