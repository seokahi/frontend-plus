// src/App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PostWrapperPage from './pages/PostWrapperPage';
import PostPage from './pages/RegisterPostPage';
import useAuth from './hook/useAuth';
import { useDarkMode } from './hook/useDarkMode';

const App: React.FC = () => {
  useAuth();
  const [theme] = useDarkMode();

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}>
              <Route index element={<HomePage />} />
              <Route path='/user/login' element={<LoginPage />} />
              <Route path='/user/signup' element={<SignUpPage />} />
              <Route path='/info/*' element={<PostWrapperPage />} />
              <Route path='/info/new' element={<PostPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;