import React, { useState, useEffect } from 'react';
// import { BASE_AWS_API } from '../../../../config';
import './Rank.scss';

const Rank = () => {
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    fetchRankTop10();
  }, []);

  const fetchRankTop10 = () => {
    // fetch(`${BASE_AWS_API}/feeds/rank`, {
    fetch(`../weet/data/feedRank.json`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setRankList(data.data.feedRanking);
      });
  };

  if (rankList.length === 0) {
    return null;
  }

  return (
    <div className="rank">
      <div className="titleDiv">
        <img
          src="https://kgy8987.github.io/weet/images/logo.png"
          alt="로고이미지"
          className="logoImg"
        />
        <h4>Top 10</h4>
      </div>
      <div className="rankDiv">
        <ol className="rankList">
          {rankList?.map((list, index) => (
            <li className="rankMap" key={index}>
              <div className="ranking">{index + 1}등</div>
              <div className="userBadge">
                <img src={list.badge} alt="챌린지뱃지" className="badgeImg" />
                <div className="userNickname">{list.nickname}</div>
              </div>
              <div className="userFeedCount">
                작성게시글 {list.feed_count}개
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Rank;
