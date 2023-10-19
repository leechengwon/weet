import React, { useEffect, useState } from 'react';
import './Bar.scss';

const offset = 0.1; // width 증감 offset
const animateTime = 1; // animation 지속시간

const Bar = (props) => {
  const { label, unit, total, value } = props;

  const [percentage, setPercentage] = useState(0);

  const [width, setWidth] = useState(0); //width is percentage value;

  useEffect(() => {
    setPercentage((value / total) * 100);
  }, [total, value]);

  useEffect(() => {
    let timer = null;
    if (percentage) {
      let _width = 0;
      timer = setInterval(() => {
        _width = _width + offset;
        setWidth(_width);
        if (Math.floor(_width) === Math.floor(percentage)) {
          clearInterval(timer);
          setWidth(percentage);
        }
      }, animateTime);
    }

    return () => {
      clearInterval(timer);
    };
  }, [percentage]);

  return (
    <div className="bar">
      <div className="look">
        <span className="a">{label}</span>
        <span className="b">{`${value} ${unit}`}</span>
      </div>
      <div className="barBox">
        <div
          className="barBoxAll"
          style={{
            width: `${width}%`,
            backgroundColor: `${percentage > 100 ? 'red' : '#5e3dea'}`,
          }}
        />
      </div>
    </div>
  );
};

export default Bar;
