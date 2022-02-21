import React,{useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { authLogout } from '../../modules/auth';
import { withRouter } from 'react-router-dom';
import { changeNaviSubMenu} from '../../modules/navigation'

const HeaderContainer = ({ history}) => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const { sub_menu_id } = useSelector(({ navigation }) => ({
    sub_menu_id: navigation.sub_menu_id,
  }));
  const onChangeSubMenuId = useCallback(
    (sub_menu_id) => {
      dispatch(changeNaviSubMenu(sub_menu_id));
    },
    [sub_menu_id],
  );
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authLogout());
    dispatch(logout());
    history.push('/login');
  };
  return (
    <Header
      user={user}
      onLogout={onLogout}
      onChangeSubMenuId={onChangeSubMenuId}
    />
  );
};

export default withRouter(HeaderContainer);
