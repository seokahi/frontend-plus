// src/components/Header.tsx
import React from 'react';
import Logo from "../../assets/favicon.svg";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, logoutState } from '../../recoil/User/User';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hook/useDarkMode';

const Header: React.FC = () => {
  const user = useRecoilValue(loginState);
  const setLogout = useSetRecoilState(logoutState);
  const navigate = useNavigate();
  const [theme, toggleTheme] = useDarkMode();
  console.log("헤더부분user",user)
  const handleLogout = () => {
    setLogout({ _id: 0, email: "", name: "", profileImage: "", accessToken: "", refreshToken: "" });
    localStorage.removeItem('user');
  };

  return (
    <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
      <div className="w-1/2 order-1 md:w-auto">
        <a className="flex items-center gap-2" onClick={() => navigate('/')}>
          <img className="mr-3 h-6 sm:h-9" src={Logo} alt="로고 이미지" />
          <span className="text-lg font-bold">멋사컴</span>
        </a>
      </div>
      <div className="w-auto order-2 text-base mt-4 md:mt-0">
        <ul className="flex items-center gap-6 uppercase">
          <li className="hover:text-amber-500 hover:font-semibold" onClick={() => navigate('/info')}>정보공유</li>
          <li className="hover:text-amber-500 hover:font-semibold" onClick={() => navigate('/info')}>자유게시판</li>
          <li className="hover:text-amber-500 hover:font-semibold" onClick={() => navigate('/info')}>질문게시판</li>
        </ul>
      </div>
      <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
        {user.accessToken === ""? (
          <div className="flex justify-end">
            <button type="button" className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={() => navigate('/user/login')}>로그인</button>
            <button type="button" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={() => navigate('/user/signup')}>회원가입</button>
          </div>
        ) : (
          <p className="flex items-center">
            <img className="w-8 rounded-full mr-2" src={`https://api.fesp.shop/${user.profileImage}`} alt="프로필 이미지" />
            {user.name}
            <button type="button" className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={handleLogout}>로그아웃</button>
          </p>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          className="ml-4 flex items-center w-8 h-8 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
            </svg>
          )}
          <span className="sr-only">Toggle dark/light mode</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
