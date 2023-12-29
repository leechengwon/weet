import React from 'react';
import './Popup.scss';
import Button from '../Button/Button';

const Popup = (props) => {
  const { title, leftBtnValue, leftBtnClick, rightBtnValue, rightBtnClick } =
    props;
  return (
    <div className="popup">
      <div className="popupBox">
        <div className="logoTitle">
          <img
            className="logoImg"
            src="https://kgy8987.github.io/weet/images/logo.png"
            alt="로고사진"
          />
          <p>{title}</p>
        </div>

        <div className="selectContainer">
          <Button onClick={leftBtnClick}>{leftBtnValue}</Button>
          <Button onClick={rightBtnClick}>{rightBtnValue}</Button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
