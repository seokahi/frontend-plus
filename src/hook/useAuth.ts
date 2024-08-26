import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atom';

interface LocalStorageProps {
  _id: number;
  email: string;
  name: string;
  profileImage: string;
  accessToken: string;
  refreshToken: string;
}

const getUserFromLocalStorage = (): LocalStorageProps | null => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user: LocalStorageProps = JSON.parse(userString);
    return user;
  }
  return null;
};


const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const reLogin = async () => {

    const userInfo = getUserFromLocalStorage();
      // user 객체에서 refreshToken 가져오기
      const refreshToken = userInfo?.refreshToken;
      console.log('Refresh Token:', refreshToken);

    if (refreshToken) {
      try {
        const response = await fetch('https://api.fesp.shop/auth/refresh', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${refreshToken}`
          },
        });

        const result = await response.json();
        console.log(result);
        if (result.ok === 1) {
          const { accessToken } = result.accessToken;

          console.log('refresh 성공');

          localStorage.setItem('accessToken', accessToken);
          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
          localStorage.setItem('tokenExpiration', expirationDate.toISOString());
          setUser(prevUser => ({
            ...prevUser,
            accessToken,
          }));
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.log('refresh 실패, 모든 토큰 삭제');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  };

  useEffect(() => {
    reLogin();
    const checkAndRefreshToken = async () => {
      const now = new Date();
      const tokenExpiredTime = localStorage.getItem('tokenExpiration');
      if (tokenExpiredTime) {
        const expirationTime = new Date(tokenExpiredTime);
        const timeLeft = expirationTime.getTime() - now.getTime();
        const minutesLeft = timeLeft / (1000 * 60);

        if (minutesLeft <= 30) {
          console.log('Token is about to expire, refreshing...');
          await reLogin();
        }
      }
    };

    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 60 * 60 * 1000); // 60분마다 토큰 만료 시간을 확인하여 갱신

    return () => clearInterval(interval);
  }, []);

  return null; 
};

export default useAuth;
