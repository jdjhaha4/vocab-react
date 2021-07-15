import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  register,
  idDuplCheck,
  idDuplInit,
} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useState } from 'react';
import produce from 'immer';

const RegisterForm = () => {
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [validationError, setValidationError] = useState({
    type: 'passwordConfirm',
    status: false,
    title: '비밀번호 확인',
    message: '비밀번호 확인 입력 값이 비밀번호 입력 값과 다릅니다.',
  });
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
  }));
  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };
  //폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { id, idDuplCheck, nickname, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 확인';
        draft['message'] =
          '비밀번호 확인 입력 값이 비밀번호 입력 값과 다릅니다.';
      });

      setValidationError(nextState);
      return;
    }
    if (idDuplCheck && !idDuplCheck.available) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'idDuplCheck';
        draft['status'] = true;
        draft['title'] = '아이디 중복 확인';
        draft['message'] =
          '이미 사용중인 아이디 입니다.';
      });

      setValidationError(nextState);
      return;
    }
    dispatch(register({ id, nickname, password }));
  };
  const onIdDuplCheck = (e) => {
    const { id } = form;
    dispatch(idDuplCheck({ id }));
  };
  //컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onIdDuplCheck={onIdDuplCheck}
      onIdDuplInit={() => {
        dispatch(idDuplInit());
      }}
      validationError={validationError}
      setValidationError={setValidationError}
    />
  );
};

export default RegisterForm;
