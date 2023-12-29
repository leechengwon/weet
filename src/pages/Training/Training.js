import React, { useEffect, useState } from 'react';
import './Training.scss';
import TrainingContainer from '../../components/TrainingContainer/TrainingContainer';
// import { BASE_AWS_API } from '../../config';

const Training = () => {
  const [trainingData, setTrainingData] = useState({});
  const [currentWeight, setCurrentWeight] = useState();
  const [targetWeight, setTargetWeight] = useState();
  const shoulderIcon = '/images/icon-shoulder.png';
  const backIcon = '/images/icon-back.png';
  const lowerBodyIcon = '/images/icon-lower.png';
  const chestIcon = '/images/icon-chest.png';
  const armIcon = '/images/icon-arm.png';

  function calculateCompletionRate(currentWeight, targetWeight) {
    if (currentWeight <= targetWeight) {
      return 100;
    } else {
      return ((targetWeight / currentWeight) * 100).toFixed(1);
    }
  }

  const completionRate = calculateCompletionRate(currentWeight, targetWeight);
  const remainingWeight = currentWeight - targetWeight;

  useEffect(() => {
    fetch('/data/training.json', {
      // fetch(`${BASE_AWS_API}/training`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //     Authorization: localStorage.getItem('accessToken'),
      //   },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'READ_SUCCESS') {
          setTrainingData(result.data);
          setCurrentWeight(result.data.currentWeight);
          setTargetWeight(result.data.targetWeight);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);
  if (!trainingData) {
    return null;
  }
  return (
    <div className="Training">
      <section className="sectionInner">
        <h2 className="pageLogo">
          <img src="/images/icon-exercise.png" alt="운동법 아이콘" />
        </h2>
        <h1 className="pageText">위트 맞춤 트레이닝</h1>
        <p className="subText">
          '위트'에서 고객 건강 정보를 바탕으로 제공하는 운동법 정보입니다.
        </p>
        <p className="subNoticeText">
          *위트에서는 모든 운동 시작 전 가볍게 런닝 30분을 권장드립니다.
        </p>
        <div className="userTrainingInfo">
          <div className="userNotice">
            <p className="badge">
              <img src="/images/icon-fat.png" alt="체중계 아이콘" />
            </p>
            <span className="userNickname">{trainingData.nickName}</span>님
            목표체중까지&nbsp;&nbsp;
            <span className="userCal"> {remainingWeight}kg </span>
            &nbsp;남았습니다.
          </div>
          <div className="userWeightBarWrapper">
            <span className="weight">시작 {trainingData.startWeight}kg</span>
            <div className="targetWeightBar">
              <p className="currentBar" style={{ width: `${completionRate}%` }}>
                현재 {currentWeight}kg
              </p>
            </div>
            <span className="target">목표 {trainingData.targetWeight}kg</span>
          </div>
        </div>

        <div className="TrainingContentWrapper">
          <div className="trainingContainer">
            <h1 className="todayText">
              <p className="todayDate">2023.10.18</p>
              &nbsp; &nbsp; {trainingData.nickName}님 오늘의 트레이닝 &nbsp;
              &nbsp;
            </h1>
            <TrainingContainer
              trainingData={trainingData.shoulder}
              iconImg={shoulderIcon}
              exerciseArea="어깨 운동"
            />
            <TrainingContainer
              trainingData={trainingData.back}
              iconImg={backIcon}
              exerciseArea="등 운동"
            />
            <TrainingContainer
              trainingData={trainingData.lowerBody}
              iconImg={lowerBodyIcon}
              exerciseArea="하체 운동"
            />
            <TrainingContainer
              trainingData={trainingData.chest}
              iconImg={chestIcon}
              exerciseArea="가슴 운동"
            />
            <TrainingContainer
              trainingData={trainingData.arm}
              iconImg={armIcon}
              exerciseArea="팔 운동"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
