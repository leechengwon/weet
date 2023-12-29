import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatting from '../../pages/MyPage/Info/Chatting/Chatting';
import Popup from '../Popup/Popup';
import './ChattingBtn.scss';

const ChattingBtn = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [isPopup, setIsPopup] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const token = 'token';

  const goChatting = () => {
    // 로그인 안한 경우
    if (!token) {
      setIsPopup({
        open: true,
        title: '로그인후 이용해주세요.',
        leftBtnValue: '로그인으로 이동',
        rightBtnValue: '닫기',
        leftBtnClick: goLogin,
        rightBtnClick: closePopup,
      });

      return;
    }

    // 로그인 했지만, 구독 안한 경우
    if (userInfo.isSubscribe === 0) {
      setIsPopup({
        open: true,
        title: '구독전용서비스 입니다.',
        leftBtnValue: '구독하러가기',
        rightBtnValue: '닫기',
        leftBtnClick: goSubscribe,
        rightBtnClick: closePopup,
      });

      return;
    }

    // 구독까지 한 경우
    setIsChatting(true);
  };

  const closePopup = () => {
    setIsPopup({ ...isPopup, open: false });
  };

  const goSubscribe = () => {
    setIsPopup({ ...isPopup, open: false });
    navigate('/subscribe');
  };

  const goLogin = () => {
    setIsPopup({ ...isPopup, open: false });
    navigate('/login');
  };

  useEffect(() => {
    if (!token) return;

    fetch('../weet/data/condition.json', {
      // fetch('http://10.58.52.69:8000/users', {
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',
      //   Authorization: token,
      // },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserInfo(result.data);
      });
  }, [token]);

  return (
    <div className="chattingBtn">
      <button onClick={goChatting} className="chattingBtnOpen">
        1:1 <br /> 트레이너
        <br /> 만나기
      </button>
      {isChatting && (
        <Chatting nickname={userInfo.nickname} setChatting={setIsChatting} />
      )}
      {isPopup.open && (
        <Popup
          title={isPopup.title}
          leftBtnValue={isPopup.leftBtnValue}
          rightBtnValue={isPopup.rightBtnValue}
          leftBtnClick={isPopup.leftBtnClick}
          rightBtnClick={isPopup.rightBtnClick}
        />
      )}
    </div>
  );
};

export default ChattingBtn;
