import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';
import { BASE_AWS_API } from '../../config';
import Popup from '../Popup/Popup';

const Nav = () => {
  const navigate = useNavigate();
  const isLogin = true;
  const accessToken = 'token';
  const [userData, setUserData] = useState();
  const [scrollTop, setScrollTop] = useState(0);
  const [popup, setPopup] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      setScrollTop(currentScrollTop);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   accessToken &&
  //     fetch(`{BASE_AWS_API}/users/grades}
  //     `, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //         Authorization: localStorage.getItem('accessToken'),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         setUserData(result.data);
  //       });
  // }, [accessToken]);

  const handleLogAuto = () => {
    fetch(`${BASE_AWS_API}/auth/logout`, {
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
          navigate('/');
          window.location.reload();
        }
      });
  };

  const authenticatedNavigate = (path) => {
    if (!isLogin) {
      setPopup({
        open: true,
        title: '로그인후 이용가능합니다.',
        leftBtnValue: '로그인 하러가기',
        rightBtnValue: '닫기',
        leftBtnClick: goLogin,
        rightBtnClick: closePopup,
      });
      return;
    }
    navigate(path);
  };

  const goLogin = () => {
    navigate('/login');
    closePopup();
    scrollToTop();
  };

  const closePopup = () => {
    setPopup({ ...popup, open: false });
  };

  const goToMain = () => {
    navigate('/');
  };

  const goToCommunity = () => {
    navigate('/community');
  };
  const goToLocation = () => {
    navigate('/location');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const goToSubscribe = () => authenticatedNavigate('/subscribe');
  const goToCondition = () => authenticatedNavigate('/info');
  const goToTraining = () => authenticatedNavigate('/training');
  const goToExercise = () => authenticatedNavigate('/exercise');
  const goToLogin = () => authenticatedNavigate('/login');

  return (
    <nav
      className={`${scrollTop >= 0 && scrollTop <= 30 ? 'nav' : 'nav white'}`}
    >
      <div className="navinner">
        <div className="logoSection">
          <img
            src="/images/logo-bg.png"
            onClick={goToMain}
            alt="메인로고사진없음"
          />
        </div>

        <div className="navList">
          <button
            className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
            onClick={goToSubscribe}
          >
            구독하기
          </button>
          <button
            className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
            onClick={goToCommunity}
          >
            커뮤니티
          </button>
          <button
            className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
            onClick={goToTraining}
          >
            맞춤트레이닝
          </button>
          <button
            className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
            onClick={goToExercise}
          >
            맞춤식단
          </button>
          <button
            className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
            onClick={goToLocation}
          >
            주변위치검색
          </button>
          {isLogin && <button onClick={goToCondition}>상태페이지</button>}

          <div className="userGrade">
            {isLogin && <img src={userData && userData.badgeImageUrl} alt="" />}
          </div>
          {isLogin ? (
            <button className="btnLogAuto" onClick={handleLogAuto}>
              <span className="userNickname">
                {userData && userData.nickname}
              </span>
              로그아웃
            </button>
          ) : (
            <button
              className={`${scrollTop >= 0 && scrollTop <= 30 ? '' : 'black'}`}
              onClick={goToLogin}
            >
              로그인
            </button>
          )}

          {popup.open && (
            <Popup
              title={popup.title}
              leftBtnValue={popup.leftBtnValue}
              rightBtnValue={popup.rightBtnValue}
              leftBtnClick={popup.leftBtnClick}
              rightBtnClick={popup.rightBtnClick}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
