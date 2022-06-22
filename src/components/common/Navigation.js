import React,{ useState, useEffect} from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link, useHistory } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const NavigationBlock = styled.div`
  margin-top: 15px;
  display:block;
  
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Wrapper = styled(Responsive)`
  overflow: hidden;
  .item {
    float: left;
  }
  .item:first-child > a {
    border-radius: 10px 0 0 10px;
  }
  .item:last-child > a {
    border-radius: 0 10px 10px 0;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 2px 10px;
  border: 1px solid ${palette.gray[8]};

  &.active {
    background: ${palette.gray[8]};
    color: white;
  }

  &:hover {
    background: ${palette.gray[6]};
    color: white;
  }
`;

const Navigation = ({ menuId, onChangeMenuId, pageMenuId }) => {
  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  useEffect(()=>{
    if(pageMenuId != undefined && menuId !== pageMenuId){
      onChangeMenuId(pageMenuId);
    }
  },[]);
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          if(history.location.pathname.startsWith("/vocab")){
            onChangeMenuId("/vocab");
          }else if(history.location.pathname.startsWith("/share")){
            onChangeMenuId("/share");
          }else{
            onChangeMenuId("home");
          }
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          if(history.location.pathname.startsWith("/vocab")){
            onChangeMenuId("/vocab");
          }else if(history.location.pathname.startsWith("/share")){
            onChangeMenuId("/share");
          }else{
            onChangeMenuId("home");
          }
        }
      }
    });
  }, [locationKeys]);
  return (
    <NavigationBlock>
      <Wrapper>
        <div className="item">
          <StyledLink
            className={menuId === 'home' ? 'active' : ''}
            to="/"
            onClick={() => {
              onChangeMenuId('home');
            }}
          >
            홈
          </StyledLink>
        </div>
        <div className="item">
          <StyledLink
            className={menuId === '/vocab' ? 'active' : ''}
            to="/vocab"
            onClick={() => {
              onChangeMenuId('/vocab');
            }}
          >
            영단어
          </StyledLink>
        </div>
        <div className="item">
          <StyledLink
            className={menuId === '/share' ? 'active' : ''}
            to="/share"
            onClick={() => {
              onChangeMenuId('/share');
            }}
          >
            공유단어
          </StyledLink>
        </div>
      </Wrapper>
    </NavigationBlock>
  );
};

export default Navigation;
