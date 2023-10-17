import React from 'react';
import FeedImages from './FeedImages/FeedImages';
import './FeedList.scss';

const FeedList = ({ feedList }) => {
  const formatCreatedAt = (createdAt) => {
    const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  return (
    <ul className="feedList">
      {feedList.feeds?.map((feed) => (
        <li key={feed.id}>
          <div className="feedContent">
            <div className="userDiv">
              <div className="userInfo">
                <div className="badge">
                  <img src="/images/dog.jpg" alt="배지" />
                </div>
                <div className="nickname">{feed.userNickname}</div>
              </div>
              {feed.isMyPost ? (
                <div className="btnBox">
                  <button type="button" className="changeBtn subBtn">
                    수정
                  </button>
                  <button type="button" className="deleteBtn subBtn">
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
            <FeedImages feed={feed} />
            <div className="feedText">
              <div className="text">{feed.content}</div>
              <div className="commentDiv">
                <div className="commentThings">댓글 {feed.comment}개</div>
                <div>comment component 자리</div>
              </div>
              <div className="writeDate">{formatCreatedAt(feed.createdAt)}</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FeedList;
