import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  initializeForm,
  register,
  idDuplCheck,
  nicknameDuplCheck,
  idDuplInit,
  nicknameDuplInit,
} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useState } from 'react';
import produce from 'immer';
import client from '../../lib/api/client';
import { check } from '../../modules/user';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);

  const [validationError, setValidationError] = useState({
    type: 'passwordConfirm',
    status: false,
    title: '비밀번호 확인',
    message: '비밀번호 확인 입력 값이 비밀번호 입력 값과 다릅니다.',
  });
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
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
    const { id, idDuplCheck, nicknameDuplCheck, nickname, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
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

    var reg = /^(?=.*?[a-zA-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (false === reg.test(password)) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 유효성';
        draft['message'] =
          '숫자+영문자+특수문자 조합으로 8자리 이상 사용해야 합니다.';
      });
      setValidationError(nextState);
      return;
    } else if (/(\w)\1\1\1/.test(password)) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 유효성';
        draft['message'] =
          '비밀번호에 같은 문자를 4번 연속으로 사용할 수 없습니다.';
      });
      setValidationError(nextState);
      return;
    } else if (password.search(id) > -1) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 유효성';
        draft['message'] =
          '비밀번호에 아이디가 포함되었습니다.';
      });
      setValidationError(nextState);
      return;
    } else if (password.search(/\s/) != -1) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 유효성';
        draft['message'] =
          '비밀번호는 공백 없이 입력해주세요.';
      });
      setValidationError(nextState);
      return;
    } else if (hangulcheck.test(password)) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'passwordConfirm';
        draft['status'] = true;
        draft['title'] = '비밀번호 유효성';
        draft['message'] =
          '비밀번호에 한글을 사용 할 수 없습니다.';
      });
      setValidationError(nextState);
      return;
    }

    if (idDuplCheck && !idDuplCheck.available) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'idDuplCheck';
        draft['status'] = true;
        draft['title'] = '아이디 중복 확인';
        draft['message'] = '이미 사용중인 아이디 입니다.';
      });

      setValidationError(nextState);
      return;
    }else if (nicknameDuplCheck && !nicknameDuplCheck.available) {
      const nextState = produce(validationError, (draft) => {
        draft['type'] = 'nicknameDuplCheck';
        draft['status'] = true;
        draft['title'] = '닉네임 중복 확인';
        draft['message'] = '이미 사용중인 닉네임 입니다.';
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

  const onNicknameDuplCheck = (e) => {
    const { nickname } = form;
    dispatch(nicknameDuplCheck({ nickname }));
  };

  const onIdDuplInit = useCallback(() => {
    dispatch(idDuplInit());
  }, [form.idDuplCheck]);

  const onNicknameDuplInit = useCallback(() => {
    dispatch(nicknameDuplInit());
  }, [form.nicknameDuplCheck]);

  //컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
    return () => {
      dispatch(initializeForm('register'));
    };
  }, []);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('회원가입 실패');
      return;
    }
    if (auth) {
      // console.log('회원가입 성공');
      // console.log(auth);
      client.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //user 값(id, username) 설정이 잘 되었는지 확인
  useEffect(() => {
    if (user) {
      // console.log(user);
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem(
          'token',
          client.defaults.headers.common['Authorization'],
        );
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onIdDuplCheck={onIdDuplCheck}
      onIdDuplInit={onIdDuplInit}
      onNicknameDuplInit={onNicknameDuplInit}
      onNicknameDuplCheck={onNicknameDuplCheck}
      validationError={validationError}
      setValidationError={setValidationError}
    />
  );
};

export default withRouter(RegisterForm);
