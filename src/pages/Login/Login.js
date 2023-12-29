import './Login.scss';

const Login = () => {
  const kakaoUrl = process.env.REACT_APP_KAKAO_REST_API;
  const naverUrl = process.env.REACT_APP_NAVER_REST_API;
  return (
    <div className="Login">
      <section className="loginSectionInner flexCenter">
        <h1 className="logo">
          <img
            src="https://leechengwon.github.io/weet/images/logo2.png"
            alt="위트로고"
          />
        </h1>
        <p className="subText">간편로그인으로 위트를 쉽게 만나보세요.</p>
        <div className="btnKakaoLogin btnLogin">
          <a href={kakaoUrl} className="btnInner">
            <span className="iconWrapper">
              <img
                className="iconImg"
                src="https://leechengwon.github.io/weet/images/login_kakao.svg"
                alt="카카오 
              로그인 버튼"
              />
            </span>
            <span className="loginText">카카오 로그인</span>
          </a>
        </div>
        <div className="btnNaverLogin btnLogin">
          <a href={naverUrl} className="btnInner">
            <span className="iconWrapper">
              <img
                className="iconImg"
                src="https://leechengwon.github.io/weet/images/naver-logo.png"
                alt="네이버 로그인 버튼"
              />
            </span>
            <span className="loginText">네이버 로그인</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Login;
