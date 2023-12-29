import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Info from './pages/MyPage/Info/Info';
import Edit from './pages/MyPage/Edit/Edit';
import Subscribe from './pages/Subscribe/Subscribe';
import Nav from './components/Nav/Nav';
import Community from './pages/Community/Community';
// import Login from './pages/Login/Login';
// import LoginKakao from './pages/Login/LoginKakao';
// import LoginNaver from './pages/Login/LoginNaver';
import PostAdd from './pages/PostAdd/PostAdd';
import Exercise from './pages/Exercise/Exercise';
import SignUp from './pages/SignUp/SignUp';
import Location from './pages/Location/Location';
import Footer from './components/Footer/Footer';
import Order from './pages/Order/Order';
import ChattingBtn from './components/ChattingBtn/ChattingBtn';
import Training from './pages/Training/Training';
import ScrollToTop from './components/ScrollTop/ScrollTop';

const Router = () => {
  return (
    <BrowserRouter basename="/weet">
      <Nav />
      <ChattingBtn />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/location" element={<Location />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/info" element={<Info />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/community" element={<Community />} />
        {/* 프로젝트 종료로 소셜로그인 페이지 아웃 */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/login/kakao" element={<LoginKakao />} />
        <Route path="/login/naver" element={<LoginNaver />} /> */}
        <Route path="/post-add" element={<PostAdd />} />
        <Route path="/post-edit/:id" element={<PostAdd isEdit />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/order" element={<Order />} />
        <Route path="/training" element={<Training />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
