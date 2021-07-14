import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import {check} from '../../modules/user';
import client from '../../lib/api/client';

const LoginForm=({history})=>{
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user})=>({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form:'login',
                key: name,
                value
            })
        )
    };
    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {id, password} = form;
        dispatch(login({id, password}));
    };
    //컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    //로그인 성공/실패 처리
    useEffect(()=>{
        if(authError){
            console.log('오류 발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth){
            console.log('로그인 성공');
            console.log(auth);
            client.defaults.headers.common['Authorization']=`Bearer ${auth.token}`;
            dispatch(check());
        }
    },[auth, authError, dispatch]);

    //user 값(id, username) 설정이 잘 되었는지 확인
    useEffect(()=>{
        if(user){
            console.log(user);
            history.push('/');
            try{
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', client.defaults.headers.common['Authorization']);
            }catch(e){
                console.log('localStorage is not working');
            }
        }
    },[history, user]);

    return (
        <AuthForm
          type="login"
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          error={error}
          setError={setError}
        />
    );
};

export default withRouter(LoginForm);
