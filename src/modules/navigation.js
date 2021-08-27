import { createAction, handleActions } from 'redux-actions';

const CHANGE_NAVI_MENU = 'navigation/CHANGE_NAVI_MENU';
const CHANGE_NAVI_SUB_MENU = 'navigation/CHANGE_NAVI_SUB_MENU';

export const changeNaviMenu = createAction(
  CHANGE_NAVI_MENU,
  (menu_id) => menu_id,
);

export const changeNaviSubMenu = createAction(
  CHANGE_NAVI_SUB_MENU,
  (sub_menu_id) => sub_menu_id,
);

const initialState = {
  menu_id: 'home',
  sub_menu_id: '',
};

const navigation = handleActions(
  {
    [CHANGE_NAVI_MENU]: (state, { payload:  menu_id  }) =>({
        ...state,
        menu_id: menu_id,
      }),
    [CHANGE_NAVI_SUB_MENU]: (state, { payload:  sub_menu_id  }) =>({
        ...state,
        sub_menu_id: sub_menu_id,
      }),
  },
  initialState,
);

export default navigation;
