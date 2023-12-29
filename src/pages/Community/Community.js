import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FeedAndRank from './FeedAndRank/FeedAndRank';
// import { BASE_AWS_API } from '../../config';
import './Community.scss';

const Community = () => {
  const [feedList, setFeedList] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const TOKEN = 'token';

  const setPaginationParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', (parseInt(page) + 1).toString());
    newSearchParams.set('limit', 10);
    setSearchParams(newSearchParams);
  };

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = searchParams.get('limit') || 10;

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }

    searchParams.delete('page');
    searchParams.delete('limit');
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    fetchFeedList();
  }, [page, isMounted]);

  const fetchFeedList = () => {
    // fetch(`${BASE_AWS_API}/feeds?limit=${limit}&page=${page}`, {
    fetch(`../weet/data/communityData.json?limit=${limit}&page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(TOKEN && { Authorization: TOKEN }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const feedData = data.data;
        const newFeedData = feedData.getFeedList;
        setTotalCount(feedData.feedCount);
        setFeedList((prevFeedList) => {
          return {
            ...prevFeedList,
            feeds: [...(prevFeedList.feeds || []), ...newFeedData],
          };
        });
      });
  };

  const initialLoad = feedList.feeds && feedList.feeds.length === 0;

  if (!initialLoad) {
    return (
      <div className="community">
        <div className="container sectionInner">
          <section className="challengeBanner">
            <img
              className="challengeImg"
              src="https://kgy8987.github.io/weet/images/c-banner.png"
              alt="챌린지배너"
            />
          </section>
          <FeedAndRank
            feedList={feedList}
            setFeedList={setFeedList}
            totalCount={totalCount}
            page={page}
            limit={limit}
            setPaginationParams={setPaginationParams}
            fetchFeedList={fetchFeedList}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default Community;
