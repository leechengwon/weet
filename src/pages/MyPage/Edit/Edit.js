import React, { useEffect, useMemo, useState } from 'react';
import './Edit.scss';
import Input from '../../../components/Input/Input';
import Checkbox from '../../../components/Checkbox/Checkbox';
import Button from '../../../components/Button/Button';
import { GENDER } from '../../../data/gender';
import { PROFILE_LIST } from '../../../data/profileData';
import { useNavigate } from 'react-router-dom';
// import { BASE_AWS_API } from '../../../config';
import Popup from '../../../components/Popup/Popup';

const Edit = () => {
  const [data, setData] = useState();
  const [popup, setPopup] = useState({});
  const navigate = useNavigate();

  const token = 'token';

  const isValid = useMemo(() => {
    const validations = {};
    if (data) {
      for (let key of Object.keys(data)) {
        validations[key] = true;
      }
    }
    return validations;
  }, [data]);

  const typing = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const setGender = (e) => {
    setData({ ...data, gender: e.target.value });
  };

  const goInfo = () => {
    navigate('/info');
  };
  const closePopup = () => {
    setPopup({ ...popup, open: false });
  };

  const editDelete = () => {
    setPopup({
      open: true,
      title: '변경된 내용을 삭제하시겠어요.',
      leftBtnValue: '네',
      rightBtnValue: '아니오',
      leftBtnClick: goInfo,
      rightBtnClick: closePopup,
    });
  };

  useEffect(() => {
    fetch('/data/condition.json', {
      // fetch(`${BASE_AWS_API}/users`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.data);
      });
  }, [token]);

  const InfoEdit = () => {
    const values = Object.values(data);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === '') {
        setPopup({
          open: true,
          title: '기입하지 않은 값이 있네요.',
          leftBtnValue: '계속 작성하기',
          rightBtnValue: '수정 취소하기',
          leftBtnClick: closePopup,
          rightBtnClick: goInfo,
        });
        return;
      }
    }

    const validValues = Object.values(isValid);
    for (let j = 0; j < validValues.length; j++) {
      if (!validValues[j]) {
        setPopup({
          open: true,
          title: '유효하지 않은 값이 있네요.',
          leftBtnValue: '계속 작성하기',
          rightBtnValue: '수정 취소하기',
          leftBtnClick: closePopup,
          rightBtnClick: goInfo,
        });
        return;
      }
    }

    setPopup({
      open: true,
      title: '변경된 내용을 적용하시겠어요.',
      leftBtnValue: '적용하기',
      rightBtnValue: '취소하기',
      leftBtnClick: userInfoSubmit,
      rightBtnClick: closePopup,
    });
  };

  const userInfoSubmit = () => {
    // fetch(`${BASE_AWS_API}/users`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     Authorization: token,
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((result) => {
    //     if (result.message === 'MODIFIED_SUCCESS') {
    //       navigate('/info');
    //     } else if (result.message === 'DUPLICATED_NICKNAME') {
    //       alert('닉네임이 중복됩니다.');
    //     }
    //   });
  };
  return (
    <div className="edit">
      <div className="editContainer">
        <div className="myNickName">
          <img
            className="logo"
            src="https://leechengwon.github.io/weet/images/logo3.jpg"
            alt="로고"
          />
          <h1 className="title">내정보수정 페이지</h1>
        </div>
        {PROFILE_LIST.map((profile) => {
          const { label, unit, name, placeholder, size, type, min, max } =
            profile;
          return (
            <div className="labelBox" key={name}>
              <div className="label">
                <span>{label}</span>
                {unit && <span className="assistant">{unit}</span>}
              </div>
              <Input
                name={name}
                onChange={typing}
                placeholder={placeholder}
                value={data?.[name]}
                size={size}
                type={type}
                min={min}
                max={max}
                setValid={(valid) => {
                  isValid[name] = valid;
                }}
              />
            </div>
          );
        })}
        <span>성별</span>
        <div className="genderSelect">
          <Checkbox
            name="gender"
            label={GENDER.MALE.kor}
            value={GENDER.MALE.eng}
            onChange={setGender}
            data={data?.gender}
          />
          <Checkbox
            name="gender"
            label={GENDER.FEMALE.kor}
            value={GENDER.FEMALE.eng}
            onChange={setGender}
            data={data?.gender}
          />
        </div>
        <div className="buttonSelect">
          <Button onClick={InfoEdit}>수정하기</Button>
          <Button onClick={editDelete}>취소하기</Button>
        </div>
      </div>

      {popup.open && (
        <Popup
          title={popup.title}
          leftBtnValue={popup.leftBtnValue}
          rightBtnValue={popup.rightBtnValue}
          leftBtnClick={popup.leftBtnClick}
          rightBtnClick={popup.rightBtnClick}
        />
      )}
    </div>
  );
};

export default Edit;
