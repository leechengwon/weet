import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';
import { LOGIN_AWS_API } from '../../config';

const Nav = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem('accessToken');
  const [userData, setUserData] = useState();
  const accessToken = localStorage.getItem('accessToken');

  // const getUserInfoData = () => {
  //   fetch(`${LOGIN_AWS_API}/auth/kakao/login?code=${code}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: accessToken,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUserData(result);
  //     });
  // };

  // useEffect(() => {
  //   getUserInfoData();
  // }, []);

  useEffect(() => {
    accessToken &&
      fetch(`${LOGIN_AWS_API}/users/grades`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: localStorage.getItem('accessToken'),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUserData(result.data);
        });
  }, [accessToken]);

  // 댓글알람기능 구현중,전역상태관리
  // cosnt handleAlarm = () => {
  // };
  const handleLogAuto = () => {
    fetch(`${LOGIN_AWS_API}/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'LOGOUT_SUCCESS') {
          localStorage.removeItem('accessToken');
          alert('로그아웃 완료');
          window.location.reload();
        }
      });
  };

  const authenticatedNavigate = (path) => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  const goToSubscribe = () => authenticatedNavigate('/subscribe');
  const goToCondition = () => authenticatedNavigate('/info');
  const goToLocation = () => authenticatedNavigate('/location');
  const goToGuideLine = () => authenticatedNavigate('/');
  const goToTraining = () => authenticatedNavigate('/training');
  const goToExercise = () => authenticatedNavigate('/exercise');

  return (
    <nav className="nav">
      <div className="navinner">
        <div className="logoSection">
          <img
            src="/images/logo2.png"
            onClick={goToMain}
            alt="메인로고사진없음"
          />
        </div>
        <div className="navList">
          <button onClick={goToSubscribe}>구독하기</button>
          <button onClick={goToCommunity}>커뮤니티</button>
          <button onClick={goToTraining}>맞춤트레이닝</button>
          <button onClick={goToExercise}>맞춤식단</button>
          <button onClick={goToLocation}>내주변운동맛집</button>
          {isLogin && <button onClick={goToCondition}>상태페이지</button>}
          <div className="userGrade">
            {isLogin && (
              <img
                src={userData && userData.badgeImageUrl}
                alt="유저 등급 이미지"
              />
            )}
          </div>
          {isLogin ? (
            <button className="btnLogAuto" onClick={handleLogAuto}>
              <span className="userNickname">
                {userData && userData.nickname}
              </span>{' '}
              / 로그아웃
            </button>
          ) : (
            <Link className="btnSignUp" to="/login">
              로그인
            </Link>
          )}
          {/* <img
          src="images/chatImage.png"
          alt="알림이미지"
          onClick={handleAlarm}
        />{' '}
        피드 댓글 알람기능 구현중 */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
