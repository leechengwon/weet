import React, { useEffect, useState } from 'react';
import './BuyList.scss';
import { BASE_AWS_API } from '../../../../config';

const BuyList = (props) => {
  const { setBuyList } = props;
  const [purchaseList, setPurchaseList] = useState();
  const [purchaseDate, setPurchaseDate] = useState(sortingList[0].value);

  const token = 'token';

  useEffect(() => {
    fetch('.../weet/data/orders.json', {
      // fetch(`${BASE_AWS_API}/users/orders?before=${purchaseDate}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setPurchaseList(result);
        console.log(result);
      });
  }, [purchaseDate, token]);

  const select = (e) => {
    setPurchaseDate(e.target.value);
  };

  return (
    <div className="buyList">
      <div className="buyListContainer">
        <div className="title">
          <img
            className="logo"
            src="https://leechengwon.github.io/weet/images/logo3.jpg"
            alt="로고"
          />
          <h1> 구매내역조회 </h1>
        </div>

        <div className="selectBox">
          <select className="select" onChange={select}>
            {sortingList?.map((list) => {
              return (
                <option key={list.id} value={list.value}>
                  {list.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="buyListBox">
          <table className="table">
            <tr className="header">
              <td>주문번호</td>
              <td>결제방식</td>
              <td>구매날짜</td>
              <td>구독시작일</td>
              <td>구독종료일</td>
              <td>결제가격</td>
            </tr>
            {purchaseList?.data.map((orders) => {
              const {
                orderId,
                payment,
                orderDate,
                serviceStartDate,
                serviceEndDate,
                price,
              } = orders;
              return (
                <tr key={orderId} className="detail">
                  <td>{orderId}</td>
                  <td>{payment}</td>
                  <td>{orderDate}</td>
                  <td>{serviceStartDate}</td>
                  <td>{serviceEndDate}</td>
                  <td>{`${price.toLocaleString('ko-KR')}원`}</td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="buttonContainer">
          <button
            className="closeBtn"
            onClick={() => {
              setBuyList(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyList;

const sortingList = [
  {
    id: 0,
    name: '전체 내역',
    value: '',
  },
  {
    id: 1,
    name: '1개월 내역',
    value: '1',
  },
  {
    id: 2,
    name: '6개월 내역',
    value: '6',
  },
  {
    id: 3,
    name: '12개월 내역',
    value: '12',
  },
];
