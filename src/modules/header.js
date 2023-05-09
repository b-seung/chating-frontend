import { createAction, handleActions } from "redux-actions";

const CHANGE_MENU = "header/CHANGE_MENU";
const CHANGE_SEARCH = "header/CHANGE_SEARCH";
const CHANGE_MODAL = "header/CHANGE_MODAL";

const initState = {
  menu: false,
  search: false,
  modal: false,
};

export const changeMenu = createAction(CHANGE_MENU, () => {});
export const changeSearch = createAction(CHANGE_SEARCH, () => {});
export const changeModal = createAction(CHANGE_MODAL, () => {});

const header = handleActions(
  {
    [CHANGE_MENU]: (state, action) => ({
      ...state,
      menu: !state.menu,
      search: false,
      modal: false,
    }),
    [CHANGE_SEARCH]: (state, action) => ({
      ...state,
      search: !state.search,
      menu: false,
      modal: false,
    }),
    [CHANGE_MODAL]: (state, action) => ({
      ...state,
      modal: !state.modal,
      menu: false,
      search: false,
    }),
  },
  initState
);

export default header;
