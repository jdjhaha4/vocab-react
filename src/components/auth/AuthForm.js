import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { useState, useEffect, useRef } from 'react';
import AuthAlertModal from './AuthAlertModal';
import produce from 'immer';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const IdAvailableMessageBlock = styled.div`
  margin: 5px 0 10px 0;
  color: #2f9d27;
`;

const IdDuplMessageBlock = styled.div`
  margin: 5px 0 10px 0;
  color: red;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};
const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  setError,
  onIdDuplCheck,
  onIdDuplInit,
  validationError,
  setValidationError,
}) => {
  const idInputEl = useRef(null);
  const text = textMap[type];
  const [modal, setModal] = useState({
    type: "login",
    visible: false,
    title: '로그인',
    message: '사용자 계정 또는 비밀번호를 확인해주세요.',
  });
  const onConfirm = () => {
    const nextState = produce(modal, (draft) => {
      draft['visible'] = false;
    });

    setModal(nextState);
    if(modal.type === "login"){
      setError(null);
    }else if(modal.type === validationError.type){
      const nextState = produce(validationError, (draft) => {
        draft['status'] = false;
      });
      setValidationError(nextState);
    }
  };

  useEffect(() => {
    if (error != null) {
      const nextState = produce(modal, (draft) => {
        draft['visible'] = true;
      });

      setModal(nextState);
    }
  }, [error]);

  useEffect(() => {
    if (type === 'register' && validationError.status === true) {
      const nextState = produce(modal, (draft) => {
        draft['type'] = validationError.type;
        draft['visible'] = true;
        draft['title'] = validationError.title;
        draft['message'] =validationError.message;
      });

      setModal(nextState);
    }
  }, [validationError]);

  useEffect(() => {
    if (type === 'register' && form.id !== '') {
      onIdDuplCheck();
    } 
  }, [form.id]);

  useEffect(() => {
    if (type === 'register' && form.id === '') {
      onIdDuplInit();
    }
  }, [form.idDuplCheck]);
  useEffect(() => {
    idInputEl.current.focus();
  }, []);
  return (
    <>
      <AuthFormBlock>
        <h3>{text}</h3>
        <form onSubmit={onSubmit} autoComplete="off">
          <StyledInput
            ref={idInputEl}
            name="id"
            placeholder="아이디"
            onChange={onChange}
            value={form.id}
          />
          {type === 'register' &&
            form.idDuplCheck &&
            form.idDuplCheck.available && (
              <IdAvailableMessageBlock>
                사용 가능한 아이디 입니다.
              </IdAvailableMessageBlock>
            )}
          {type === 'register' &&
            form.idDuplCheck &&
            !form.idDuplCheck.available && (
              <IdDuplMessageBlock>
                이미 사용중인 아이디 입니다.
              </IdDuplMessageBlock>
            )}
          {type === 'register' && (
            <StyledInput
              autoComplete="nickname"
              name="nickname"
              placeholder="닉네임"
              onChange={onChange}
              value={form.nickname}
            />
          )}
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
          {type === 'register' && (
            <StyledInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          )}
          <ButtonWithMarginTop cyan fullWidth>
            {text}
          </ButtonWithMarginTop>
        </form>
        <Footer>
          {type === 'login' ? (
            <Link to="/register">회원가입</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </Footer>
      </AuthFormBlock>
      <AuthAlertModal
        visible={modal.visible}
        onConfirm={onConfirm}
        title={modal.title}
        message={modal.message}
      />
    </>
  );
};

export default AuthForm;
