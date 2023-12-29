import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container sectionInner">
        <div className="logoDiv">
          <Link to="/">
            <img
              className="logoImg"
              src="https://kgy8987.github.io/weet/images/footer-logo.png"
              alt="로고이미지"
            />
          </Link>
        </div>
        <div className="infoDiv">
          <p className="addressInfo">
            06159 서울특별시 강남구 테헤란로 427, 00층(삼성동) WEE.T(우리들의
            트레이너) 개발팀
          </p>
          <p className="emailInfo">
            wecode_team5@weet.co.kr |{' '}
            <span className="phoneInfo">012-345-6789, 6790</span>
          </p>
        </div>
        <div className="iconDiv">
          <div className="icon">
            <div className="iconImg">
              <img
                src="https://kgy8987.github.io/weet/images/facebook-logo.png"
                alt="F로고"
              />
            </div>
            <div className="iconImg">
              <img
                src="https://kgy8987.github.io/weet/images/insta-logo.png"
                alt="I로고"
              />
            </div>
            <div className="iconImg">
              <img
                src="https://kgy8987.github.io/weet/images/twitter-logo.png"
                alt="I로고"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        &copy; Copyright 2023 - WEE.T(우리들의 트레이너), All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
