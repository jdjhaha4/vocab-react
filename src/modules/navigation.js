import { createAction, handleActions } from 'redux-actions';

const CHANGE_NAVI_MENU = 'navigation/CHANGE_NAVI_MENU';

export const changeNaviMenu = createAction(
  CHANGE_NAVI_MENU,
  (menu_id) => menu_id,
);

const initialState = {
  menu_id: 'home',
};

const navigation = handleActions(
  {
    [CHANGE_NAVI_MENU]: (state, { payload:  menu_id  }) =>({
        ...state,
        menu_id: menu_id,
      }),
  },
  initialState,
);

export default navigation;
