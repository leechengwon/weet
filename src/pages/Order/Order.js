import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Order.scss';

const Order = () => {
  const navigate = useNavigate();

  const subscribeId = localStorage.getItem('subscribeId');
  const month = localStorage.getItem('month');
  const price = localStorage.getItem('price');

  const IMP = window.IMP;
  const handlePayment = () => {
    IMP.init('imp21134852');
    IMP.request_pay(
      {
        pg: 'kakaopay',
        pay_method: 'card',
        name: 'test',
        amount: 3900,
      },
      function (rsq) {
        const { status, imp_uid } = rsq;
        if (status === 'failed') {
          alert('결제에 실패했습니다. 결제정보를 다시 확인해주세요.');
        } else if (status === 'paid') {
          fetch(`http://url:8000/subscription/checkout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({
              imp_uid,
              orderId: 12345,
              paymentsId: 1,
              subscribeId: 1,
              requestedAt: '2023-10-03T13:04:55+09:00',
              approvedAt: '2023-10-03T13:06:55+09:00',
            }),
          })
            .then((response) => {
              if (response.status === 200) {
                return response.json();
              }
            })
            .then((result) => {
              if (result.message === 'CREATE_ORDER_SUCCESS') {
                localStorage.setItem('orderId', result.orderId);
                alert('결제성공!');
                navigate('/');
              } else {
                alert('실패');
              }
            })
            .catch((error) => {
              console.error('오류 발생:', error);
            });
        }
      },
    );
  };

  return (
    <div className="order">
      <section className="subscribeInfo sectionInner">
        <div className="subscribeTitle">구독상품 정보</div>
        <div className="subscribeDiv">
          <div className="subscribeImgAndMonth">
            <img
              className="subImg"
              src="/images/subscribeImg.png"
              alt="구독이미지"
            />
          </div>
          <table className="subTable">
            <tr>
              <td>구독 개월수</td>
              <td>상품 금액</td>
              <td>할인 금액</td>
              <td>결제 금액</td>
            </tr>
            <tr>
              <td>{month}개월</td>
              <td>{price}원</td>
              <td>(-)4,900원</td>
              <td>${price}원</td>
            </tr>
          </table>
        </div>
      </section>
      <section className="paymentMethod sectionInner">
        <div className="methodTitle">결제 방법</div>
        <div className="selectMethod">
          <div className="buttonDiv">
            <button type="button" onClick={handlePayment}>
              <img src="/images/payment_small.png" alt="카카오페이" />
            </button>
          </div>
          <div className="buttonDiv">
            <button type="button">
              <img src="/images/logo-toss-pay.png" alt="토스페이" />
            </button>
          </div>
          <div className="buttonDiv">
            <button type="button">신용·체크카드</button>
          </div>
          <div className="buttonDiv">
            <button type="button">가상계좌</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
