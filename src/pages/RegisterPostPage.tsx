import { useState } from "react";
import PostContentInput from "../components/input/PostContentInput"
import PostTitleInput from "../components/input/PostITitlenput"
import {  useNavigate } from "react-router-dom";
import { loginState } from "../recoil/User/User";
import { useRecoilValue } from "recoil";
import ButtonInput from "../components/button/Button";



const  PostPage:React.FC = ()=> {
    const [title,setTitle] = useState("");
    const [content,setContent ] = useState("");
    const navigate = useNavigate();
    const user = useRecoilValue(loginState);
    const handleRegister =  async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const PostData = JSON.stringify({
        "title": title,
        "content": content,
        "tag": "혼자,떠나요,제주도"
      })
      try {
        const response = await fetch('https://api.fesp.shop/posts/', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Authorization':`Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          },
          body:PostData
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log('Post request successful:', result);
        navigate('/info');
       
      } catch (error) {
        console.error('Error posting data:', error);
      } 
    }
    
    return (
        <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
        </div>
        <section className="mb-8 p-4">
          <form >
            <PostTitleInput title={title} setTitle={setTitle}/>
            <PostContentInput content={content} setContent={setContent}/>
            <hr />
            <div className="flex justify-end my-6">
            <ButtonInput type="submit" btnSize="st" bgColor="orange" Text="st"   onClick={handleRegister}>등록</ButtonInput> 
            <ButtonInput type="reset" btnSize="st" bgColor="gray" Text="st"    onClick={() => navigate(-1)}>취소</ButtonInput> 
                    
          </div>
          </form>
        </section>

      </main>
      
    )
}

export default PostPage