import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { loginState } from "../recoil/User/User";
import ButtonInput from "../components/button/Button";
import LoginInput from "../Container/Login/LoginInput";
import {LocalStorageProps} from "../type/Type";
import Title from "../components/common/Title";

const LoginPage: React.FC =  () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useRecoilState(loginState);
  useEffect(()=> {
    console.log("user",user);
  },[user])
  const navigate = useNavigate();
  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userData = JSON.stringify({
        "email": email,
        "password": password
    })

    try {
      const response = await fetch('https://api.fesp.shop/users/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:userData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Post request successful:', result.item);
      const { _id, email, name, profileImage } = result.item;
      const {accessToken,refreshToken} = result.item.token;
      const userInfo :LocalStorageProps= { _id:Number(result.item._id),email:result.item.email,name:result.item.name,profileImage:result.item.profileImage,accessToken:result.item.accessToken,refreshToken:result.item.refreshToken}
      localStorage.setItem('user', JSON.stringify(userInfo));
      const currentDate = new Date();
      const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      localStorage.setItem('tokenExpiration', expirationDate.toISOString());
      setUser({ _id, email, name, profileImage,accessToken, refreshToken });
      navigate('/');
    } catch (error) {
      console.error('Error posting data:', error);
    } 
  }
    return (
        <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
          <Title Size="st" Color="gray" Text="st">로그인</Title> 
          </div>
        <form>
          <LoginInput email={email} setEmail={setEmail}password={password} setPassword={setPassword}/>
            <div className="mb-4">
              <a href="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</a>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <ButtonInput type="submit" btnSize="st" bgColor="orange" Text="st" onClick={handleLogin}>로그인</ButtonInput> 
              <ButtonInput type="submit" btnSize="sp" bgColor="sp" Text="sp" onClick={()=> navigate('/user/signup')}>회원가입</ButtonInput> 
            </div>
          </form>
        </div>
      </main>
    )
}

export default LoginPage 