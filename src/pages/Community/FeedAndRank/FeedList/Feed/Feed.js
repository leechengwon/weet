import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedImages from '../FeedImages/FeedImages';
import Comments from '../../Comments/Comments';
// import { BASE_AWS_API } from '../../../../../config';
import './Feed.scss';

const Feed = ({ getFeed, data, removeFeed }) => {
  const navigate = useNavigate();
  const [isCommentExtended, setIsCommentExtended] = useState(false);
  const [commentData, setCommentData] = useState([]);

  const TOKEN = 'token';

  const formatCreatedAt = (created_at) => {
    const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  const getCommentList = () => {
    // fetch(`${BASE_AWS_API}/comments?feedId=${id}`, {
    // fetch(`http://localhost:8000/comments?feedId=${feedId}`, {
    fetch(`/data/commentData.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(TOKEN && { Authorization: TOKEN }),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error('[GET] 댓글 데이터 통신 실패');
        }
        return response.json();
      })
      .then((result) => {
        // 1.AWS 연결 시, 아래 setCommentData 사용
        // setCommentData(result.data);

        // 2.목데이터 연결 시, 아래 setCommentData 사용
        setCommentData(result.data.comments);
      });
    // .catch((Error) => console.log(Error));
  };

  const handleEditFeed = (id) => {
    navigate(`/post-edit/${id}`);
  };

  const handleDeleteFeed = (id) => {
    // fetch(`${BASE_AWS_API}/feeds/${id}`, {
    fetch(`게시물삭제엔드포인트`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;',
        Authorization: TOKEN,
      },
    }).then((response) => {
      if (response.ok) {
        getFeed();
        alert('게시물이 삭제되었습니다.');
        removeFeed(data);
      }
    });
  };

  useEffect(() => {
    getCommentList();
  }, []);

  const { id, badge, userNickname, isMyPost, content, created_at } = data;

  return (
    <li key={id} className="feedTable">
      <div className="feedContent">
        <div className="userDiv">
          <div className="userInfo">
            <div className="badge">
              <img src={badge} alt="배지" />
            </div>
            <div className="nickname">{userNickname}</div>
          </div>
          {TOKEN && isMyPost ? (
            <div className="btnBox">
              <button
                type="button"
                className="changeBtn subBtn"
                onClick={() => handleEditFeed(id)}
              >
                수정
              </button>
              <button
                type="button"
                className="deleteBtn subBtn"
                onClick={() => handleDeleteFeed(id)}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
        <FeedImages feed={data} />
        <div className="feedText">
          <div className="text">{content}</div>
          <div className="commentDiv">
            <div className="commentThings">댓글 {commentData.length}개</div>
            <div
              className="moreView"
              onClick={() => setIsCommentExtended(!isCommentExtended)}
            >
              {isCommentExtended ? '댓글 접기 ▲' : '댓글 더보기 ▼'}
            </div>
            {isCommentExtended && (
              <Comments
                feedId={id}
                commentData={commentData}
                getCommentList={getCommentList}
              />
            )}
          </div>
          <div className="writeDate">{formatCreatedAt(created_at)}</div>
        </div>
      </div>
    </li>
  );
};

export default Feed;
