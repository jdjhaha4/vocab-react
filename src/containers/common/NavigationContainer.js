import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/common/Navigation';
import { changeNaviMenu,changeNaviSubMenu } from '../../modules/navigation';
import { useLocation } from 'react-router-dom';

const NavigationContainer = ({ pageMenuId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { menu_id } = useSelector(({ navigation }) => ({
    menu_id: navigation.menu_id,
  }));

  const onChangeMenuId = useCallback(
    (menu_id) => {
      dispatch(changeNaviMenu(menu_id));
      if(menu_id=='/vocab'){
        if(location.pathname.startsWith(menu_id)){
          dispatch(changeNaviSubMenu(location.pathname));
        }else{
          dispatch(changeNaviSubMenu('/vocab'));
        }
      }else if(menu_id=='/share'){
        if(location.pathname.startsWith(menu_id)){
          dispatch(changeNaviSubMenu(location.pathname));
        }else{
          dispatch(changeNaviSubMenu('/share'));
        }
      }else{
        
      }
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
