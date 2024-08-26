import React, { useState, useEffect } from 'react';
import NameInput from '../components/input/NameInput';
import EmailInput from '../components/input/EmailInput';
import PasswordInput from '../components/input/PasswordInput';
import ProfileImgInput from '../components/input/ProfileImg';
import { useNavigate } from 'react-router-dom';
import ButtonInput from '../components/button/Button';
import Title from '../components/common/Title';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [fileImgUrl, setFileImgUrl] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    console.log("흐음", fileImg);
  }, [fileImg]);

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(name, password, email, fileImg, "gmdma");

    // 이미지 가져오기
    if (fileImg) {
      const formData = new FormData();
      formData.append('attach', fileImg);

      try {
        const response = await fetch('https://api.fesp.shop/files/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Post request successful:', result.item[0].path);
        setFileImgUrl(result.item[0].path);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }

    const FetchData = JSON.stringify({
      "email": email,
      "password": password,
      "name": name,
      "type": "user",
      "profileImage": fileImgUrl
    })

    // 회원가입
    try {
      console.log(FetchData,"보내려는 데이터")
      const response = await fetch('https://api.fesp.shop/users/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:FetchData,
      });

      if (!response.ok) {
        console.log(response,"흐음무슨에러지");
        if(response.status === 409) alert("이메일이 중복되었습니다. 다시 입력해주세요");
        else if (response.status === 422) alert("입력값 검증 오류가 있습니다. 다시 한 번 입력해주세요.")
        else if (response.status === 500) alert("서버 에러입니다. 확인하고 오겠습니다.");
        throw new Error(`${response.status}`);
      }

      const result = await response.json();
      console.log('Post request successful:', result);
      if(result.ok) navigate('/user/login');

    } catch (error) {
          console.error('Error posting data:', error);
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <Title Size="st" Color="gray" Text="st">회원 가입</Title> 
        </div>

        <form>
          <NameInput name={name} setName={setName} />
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          <ProfileImgInput setFileImg={setFileImg} />

          <div className="mt-10 flex justify-center items-center">
          <ButtonInput type="submit" btnSize="st" bgColor="orange" Text="st"  onClick={handleLogin}>회원가입</ButtonInput> 
          <ButtonInput type="button" btnSize="st" bgColor="gray" Text="st"  onClick={()=>navigate(-1)}>취소</ButtonInput> 
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
