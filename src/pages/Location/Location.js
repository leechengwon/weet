import React from 'react';
import KakaoMap from './KakaoMap/KakaoMap';
import './Location.scss';

const Location = () => {
  return (
    <div className="location">
      <div className="locationContainer">
        <div className="mainTitle">
          <img
            className="logo"
            src="https://leechengwon.github.io/weet/images/logo2.png"
            alt="로고"
          />
          <h1 className="title">내주변 검색</h1>
        </div>

        <div className="mapContainer">
          <KakaoMap />
        </div>
        <div className="tipContainer">
          <div className="tipBoxLeft">
            <p>
              <h1 className="inBodyTitle">WEE.T Tip?</h1>
              <br />
              <br />
              인바디검사는 헬스장뿐 아니라 보건소에서도 무료로 측정 가능하신거
              아셨나요?
              <br />
              <br />
              헬스장뿐 아니라 보건소에서 측정하고 내인바디 정보를 업데이트
              해보세요.
            </p>
          </div>
          <div className="tipBoxRight">
            <p>
              <h1 className="inBodyTitle">인바디 검사 (체성분 검사)란?</h1>
              <br />
              <br />
              신체를 구성하는 요소들을 '체성분' 이라고 부릅니다. 그리고 이러한
              체성분이 어떤 비율로 이루어져 있는지 구체적으로 분석하는 것을
              <span> '체성분 분석' 또는 '체성분 검사'라고합니다.</span>몸은
              지방,근육,수분 등의 체성분으로 이루어졌기 때문에 체성분 검사를
              통해 어느 것이 얼마나 있는지 알 수 있습니다.
              <br />
              <br />
              <span>
                인바디는 원래 '체성분 검사 기계'를 만드는 기업의 이름이었습니다.
              </span>
              이회사에서 출시한 '체성분 검사 기계'가 워낙 유명하다 보니
              인바디=체성분 검사라는 이미지가 생긴 것입니다. 체성분 검사를
              진행하는 방식은 더다양하지만 인바디 사에서 만든 기계로 재는 것이
              편리하고 빠르기 때문에 시장을 점유한 것입니다. 회사 측에서도
              이러한 사실을 소개하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
