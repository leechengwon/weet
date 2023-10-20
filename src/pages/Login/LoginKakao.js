import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LOGIN_KAKAO_API } from '../../config';

const LoginKakao = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  useEffect(() => {
    code &&
      fetch(`${LOGIN_KAKAO_API}?code=${code}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message === 'LOGIN_SUCCESS') {
            localStorage.setItem('newUser', result.data.accessToken);
            if (result.data.isNew) {
              navigate('/sign-up');
            } else {
              localStorage.setItem('accessToken', result.data.accessToken);
              navigate('/');
            }
          } else {
            alert('오류입니다. 관리자에게 문의하세요.');
          }
        });
  }, []);
  return <></>;
};

export default LoginKakao;