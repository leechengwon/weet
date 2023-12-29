import React, { useEffect, useState } from 'react';
import './Exercise.scss';
import DietContainer from '../../components/DietContainer/DietContainer';
// import { BASE_AWS_API } from '../../config';

const Exercise = () => {
  const [dietData, setDietData] = useState();
  const breakfastIcon = 'https://kgy8987.github.io/weet/images/icon-sun.png';
  const lunchIcon = 'https://kgy8987.github.io/weet/images/icon-lunch-sun.png';
  const dinnerIcon = 'https://kgy8987.github.io/weet/images/icon-moon.png';
  // const accessToken = localStorage.getItem(accessToken);

  useEffect(() => {
    fetch('../weet/data/exercise.json', {
      // fetch(`${BASE_AWS_API}/diets`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //     Authorization: localStorage.getItem('accessToken'),
      //   },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'READ_SUCCESS') {
          setDietData(result.data);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);
  if (!dietData) {
    return null;
  }
  return (
    <div className="Exercise">
      <section className="sectionInner">
        <h2 className="pageLogo">
          <img
            src="https://kgy8987.github.io/weet/images/icon-nuts.png"
            alt="운동법 아이콘"
          />
        </h2>
        <h1 className="pageText">위트 맞춤 추천 식단</h1>
        <p className="subText">
          '위트'에서 고객 건강 정보를 바탕으로 제공하는 식단 정보입니다.
        </p>
        <div className="userDietInfo">
          <div className="userNotice">
            <p className="badge">
              <img
                src="https://kgy8987.github.io/weet/images/icon-bread.png"
                alt="빵 아이콘"
              />
            </p>
            <span className="userNickname">{dietData.nickname}</span>
            님의 하루 섭취 권장 칼로리는
            <span className="userCal"> {dietData.dailyCalorieIntake}kcal </span>
            입니다.
          </div>
          <div className="userNutrient">
            <p className="NutrientCircle">
              <span className="nutrientText">탄수화물</span>
              <span className="carbonhydrate nutrientNum">
                {dietData.carbohydrate}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
            <p className="protein NutrientCircle">
              <span className="nutrientText">단백질</span>
              <span className="protein nutrientNum">
                {dietData.protein}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
            <p className="fat NutrientCircle">
              <span className="nutrientText">지방</span>
              <span className="fat nutrientNum">
                {dietData.fat}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
          </div>
        </div>
        <div className="dietContentWrapper">
          <div className="todayDietContainer dietContainer">
            <h1 className="todayText">
              <p className="todayDate">{dietData.today.date}</p>
              &nbsp; &nbsp; {dietData.nickname}님 오늘의 식단&nbsp; &nbsp;
            </h1>
            <DietContainer
              dietData={dietData.today.breakfast}
              mealTime="아침"
              iconImg={breakfastIcon}
            />
            <DietContainer
              dietData={dietData.today.lunch}
              mealTime="점심"
              iconImg={lunchIcon}
            />
            <DietContainer
              dietData={dietData.today.dinner}
              mealTime="저녁"
              iconImg={dinnerIcon}
            />
          </div>
          <div className="todayDietContainer dietContaine">
            <h1 className="todayText">
              <p className="todayDate">{dietData.tomorrow.date}</p>
              &nbsp; &nbsp; {dietData.nickname}님 내일 식단&nbsp; &nbsp;
            </h1>

            <DietContainer
              dietData={dietData.tomorrow.breakfast}
              mealTime="아침"
              iconImg={breakfastIcon}
            />

            <DietContainer
              dietData={dietData.tomorrow.lunch}
              mealTime="점심"
              iconImg={lunchIcon}
            />

            <DietContainer
              dietData={dietData.tomorrow.dinner}
              mealTime="저녁"
              iconImg={dinnerIcon}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exercise;
