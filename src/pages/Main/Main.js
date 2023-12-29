import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';
import Counter from '../../components/Counter/Counter';
import { BASE_AWS_API } from '../../config';
import Popup from '../../components/Popup/Popup';

const Main = () => {
  const [statisticsData, setStatisticsData] = useState({});
  const [popup, setPopup] = useState({});
  const navigate = useNavigate();
  const token = 'token';

  const closePopup = () => {
    setPopup({ ...popup, open: false });
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  const goLogin = () => {
    navigate('login');
  };

  const goToExercise = () => {
    if (!token) {
      setPopup({
        open: true,
        title: '로그인후 이용가능 합니다.',
        leftBtnValue: '로그인하러 가기',
        rightBtnValue: '닫기',
        leftBtnClick: goLogin,
        rightBtnClick: closePopup,
      });
    } else {
      navigate('exercise');
    }
  };

  const goToSubscribe = () => {
    if (!token) {
      setPopup({
        open: true,
        title: '로그인후 이용가능 합니다.',
        leftBtnValue: '로그인하러 가기',
        rightBtnValue: '닫기',
        leftBtnClick: goLogin,
        rightBtnClick: closePopup,
      });
    } else {
      navigate('subscribe');
    }
  };

  useEffect(() => {
    fetch('../weet/data/main.json', {
      // fetch(`${BASE_AWS_API}/statistics`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //     Authorization: localStorage.getItem('accessToken'),
      //   },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'READ_SUCCESS') {
          setStatisticsData(result.data);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);
  if (!statisticsData) {
    return null;
  }
  return (
    <div className="Main">
      <div className="mainBanner">
        <img
          src="https://kgy8987.github.io/weet/images/main-banner.png"
          alt="메인 배너"
        />
        <button className="btnMain" onClick={goToSubscribe}>
          구독하러 가기
        </button>
      </div>
      <div className="sectionInner">
        <h2 className="bannerTit">위트 회원만의 특별한 혜택을 만나보세요</h2>
        <div className="contentBannerWrapper">
          <div className="dietBanner boxBanner">
            <img
              src="https://kgy8987.github.io/weet/images/diet-banner.png"
              alt="위트 식단 배너"
            />
            <div className="bannerDescription">
              <h2 className="descriptionTit">맞춤 식단</h2>
              나의 건강 정보를 통해
              <br /> 탄수화물, 단백질, 지방의
              <br />
              영양소별로 나만의
              <br /> 맞춤 식단을 제공 합니다.
              <button className="btnBanner" onClick={goToExercise}>
                맞춤식단 보기
              </button>
            </div>
          </div>
          <div className="dietBanner boxBanner">
            <img
              src="https://kgy8987.github.io/weet/images/training-banner.png"
              alt="위트 트레이닝 배너"
            />
            <div className="bannerDescription">
              <h2 className="descriptionTit">피드에 자랑하기</h2>
              나의 식단, 운동 루틴 등 <br />
              건강한 습관을 피드에 자랑해 보세요. 피드를 통해 회원 등급을 올려,{' '}
              <br />
              특별한 혜택 을 만나보세요.
              <button className="btnBanner" onClick={goToCommunity}>
                커뮤니티 보러가기
              </button>
            </div>
          </div>
          <div className="dietBanner boxBanner">
            <img
              src="https://kgy8987.github.io/weet/images/banner.png"
              alt="트레이너 배너"
            />
            <div className="bannerDescription">
              <h2 className="descriptionTit">트레이너 매칭</h2>
              우리들의 트레이너
              <br />
              '위트'에서 최고의 트레이너와&nbsp;
              <br /> 실시간 채팅으로 1:1코칭을 받으며 <br />
              관리를 시작해 보세요.
              <button className="btnBanner" onClick={goToSubscribe}>
                트레이너 만나기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="challengeBannerWrapper">
        <div className="sectionInner">
          <h2 className="bannerTit">위트 챌린지에 참여해 보세요</h2>
          <div className="challengeBanner">
            <img
              src="https://kgy8987.github.io/weet/images/c-banner.png"
              alt="챌린지배너"
            />
          </div>
        </div>
      </div>
      <div className="currentBannerWrapper">
        <h2 className="bannerTit">
          <div className="sectionInner">위트는 지금</div>
        </h2>
        <div className="currentBanner">
          <div className="sectionInner">
            <div className="userCount countBox">
              <h3 className="descriptionTit">위트 회원 수</h3>
              <Counter
                initialValue={0}
                targetValue={statisticsData.userCount}
                unit="명"
              />
            </div>
            <div className="feedCount countBox">
              <h3 className="descriptionTit">위트 피드 수</h3>
              <Counter
                initialValue={0}
                targetValue={statisticsData.feedCount}
                unit="개"
              />
            </div>
            <div className="subscriberCount countBox">
              <h3 className="descriptionTit">위트 구독자 수</h3>
              <Counter
                initialValue={0}
                targetValue={statisticsData.subscriberCount}
                unit="명"
              />
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default Main;
