import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../resources/svg/home.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import produce from 'immer';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 999;
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start; /*자식 앨리먼트 사이의 여백을 최대로 설정*/
  .logo {
    width: 200px;
    flex-grow: 0;
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .menu {
    display: none;
  }
  @media (max-width: 768px) {
    .menu {
      width: 35px;
      flex-grow: 0;
      display: block;
    }
    .menu button {
      border: none;
      background: none;
    }
  }
  @media (max-width: 435px) {
    .logo{
      display:none;
    }
  }
`;
/**
 * 헤더가 fixed 로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;
const MainMenu = styled.div`
  width: 100%;
  
  position: absolute;
  left: 0;
  top: 4rem;
  z-index: 999;
  background-color: white;
  div {
    background-color:gray;
    display: flex;
    flex-direction: column;
    gap:0.5em;
    padding:15px;
    color:white;
  }
  .close_div{
    position:absolute;
    right:0;
    top:0;
    button{
      border:none;
      background-color:gray;
      color:white;
    }
  }
`;

const Header = ({ user, onLogout, onChangeSubMenuId }) => {
  const [menuToggle, setMenuToggle] = useState({ visible: false });
  const onToggleMenu = () => {
    const nextState = produce(menuToggle, (draft) => {
      draft['visible'] = !draft['visible'];
    });
    setMenuToggle(nextState);
  };
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="menu">
            <button onClick={onToggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <Link to="/" className="logo">
            VOCAB STUDY
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
      {menuToggle.visible ? (
        <MainMenu>
          <div>
            <Link to="/vocab" onClick={() => {onToggleMenu();onChangeSubMenuId('vocab')}}>
              단어 목록
            </Link>
            <Link
              to="/vocab/group"
              onClick={() => {onToggleMenu();onChangeSubMenuId('vocab/group')}}
            >
              그룹 목록
            </Link>
            <Link
              to="/vocab/group/mapping"
              onClick={() => {onToggleMenu();onChangeSubMenuId('vocab/group/mapping')}}
            >
              단어 그룹화
            </Link>
            <Link
              to="/vocab/study"
              onClick={() => {onToggleMenu();onChangeSubMenuId('vocab/study')}}
            >
              학습하기
            </Link>
            <Link
              to="/vocab/question/result"
              onClick={() => {onToggleMenu();onChangeSubMenuId('vocab/question/result')}}
            >
              학습결과
            </Link>
            <Link
              to="/vocab/attention"
              onClick={() => {onToggleMenu();onChangeSubMenuId('vocab/attention')}}
            >
              요주의단어
            </Link>
            <div className="close_div">
              <button onClick={onToggleMenu}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </MainMenu>
      ) : null}
    </>
  );
};

export default Header;
