import React, { useEffect, useRef, useState } from 'react';
import './Chatting.scss';
import { io } from 'socket.io-client';

let socket;
const SOCKET_SERVER = 'http://localhost:5001';

const parseDate = (dateStr) => {
  const currentDate = new Date(dateStr);
  //  시, 분, 를 추출합니다.
  let hours = currentDate.getHours().toString().padStart(2, '0');
  let minutes = currentDate.getMinutes().toString().padStart(2, '0');

  // 원하는 형식으로 날짜와 시간을 출력합니다.
  let formattedDate = hours + ':' + minutes;

  return formattedDate;
};

const Chatting = (props) => {
  const { setChatting, nickname } = props;
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    // 1.소켓서버를 연결 등록
    if (nickname) {
      socket = io.connect(SOCKET_SERVER, {
        cors: { origin: '*' },
      });
      // 2.서버에 나에 프롭스로 받아온 닉네임데이터로 서버에 닉네임을 등록
      socket.emit('joinUser', { username: nickname }, (roomId) =>
        setRoomId(roomId),
      );
      // 서버에서 오는 메세지를 수신하고 상태 업데이트
      socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  }, [nickname]);

  useEffect(() => {
    scrollDown();
  }, [messages.length]);

  const changeMessage = (e) => {
    setMessage(e.target.value);
  };
  const sandText = (e) => {
    if (message.length === 0 || message === '') {
      return;
    } else {
      socket.emit(
        'sendMessage',
        {
          roomId: roomId,
          username: nickname,
          message: message,
        },
        () => {
          setMessage('');
        },
      );
    }
  };

  const onSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (message.length === 0 || message === '') {
        return;
      } else {
        socket.emit(
          'sendMessage',
          {
            roomId: roomId,
            username: nickname,
            message: message,
          },
          () => {
            setMessage('');
          },
        );
      }
    }
  };

  const scrollDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const goOutChat = () => {
    setChatting(false);
  };

  return (
    <div className="chatting">
      <div className="chattingContainer">
        <div className="title">
          <img
            className="logo"
            src="https://leechengwon.github.io/weet/images/logo3.jpg"
            alt="로고"
          />
          <h1> 채팅창 </h1>
        </div>
        <div className="chattingBox" ref={scrollRef}>
          {messages.map((msg, index) => {
            return (
              <div
                className={
                  msg.username === nickname
                    ? 'contextItemContainer'
                    : 'contextItemContainerAdmin'
                }
                key={index}
              >
                <img
                  className="admin"
                  src={
                    msg.username === nickname
                      ? 'https://file.sportsseoul.com/news/cms/2023/09/19/news-p.v1.20230919.ceac473d21cc43bd92205006484893ff_P1.jpg'
                      : '.https://leechengwon.github.io/weet/images/logo2.png'
                  }
                  alt="황철순"
                />

                <div className="contextTimeBox">
                  <span className="contextItem">{msg.text}</span>
                  <span className="time">{parseDate(msg.time)}</span>
                </div>
              </div>
            );
          })}{' '}
        </div>

        <div className="sendChatContainer">
          <textarea
            type="text"
            className="sendChat"
            value={message}
            placeholder="WEE.T 구독회원님 반갑습니다. &#13;&#10; 메세지를 입력하세요."
            onChange={changeMessage}
            onKeyPress={onSubmitSearch}
          />

          <i onClick={sandText} className="fa-solid fa-paper-plane" />
        </div>

        <div className="buttonContainer">
          <button className="closeBtn" onClick={goOutChat}>
            채팅방나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
