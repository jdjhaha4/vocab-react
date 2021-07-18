import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import { changeNaviMenu } from '../../modules/navigation';

const NavigationContainer = ({ pageMenuId }) => {
  const dispatch = useDispatch();

  const { menu_id } = useSelector(({ navigation }) => ({
    menu_id: navigation.menu_id,
  }));

  const onChangeMenuId = useCallback(
    (menu_id) => {
      dispatch(changeNaviMenu(menu_id));
    },
    [menu_id],
  );

  return (
    <Navigation
      menuId={menu_id}
      onChangeMenuId={onChangeMenuId}
      pageMenuId={pageMenuId}
    />
  );
};

export default NavigationContainer;
