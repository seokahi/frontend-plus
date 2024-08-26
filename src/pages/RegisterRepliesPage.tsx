import React from "react";
import CommentInput from "../components/input/CommentInput";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/User/User";
import { useNavigate, useParams } from "react-router-dom";
import ButtonInput from "../components/button/Button";

interface RegisterRepliesPageProps {
    comment:string;
    setComment:(comment:string) => void;
    fetchData: () => void;
  }
const RegisterRepliesPage: React.FC<RegisterRepliesPageProps> = ({comment,setComment,fetchData}) => {
  const { id } = useParams<{ id: string }>();
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handleRegisterComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(comment);
    if (user.accessToken === "") {
      alert("로그인해주세요.");
      navigate('/user/login');
    } else {
        console.log(id);
      const ReplyData = JSON.stringify({
        "content": comment
      });

      try {
        const response = await fetch(`https://api.fesp.shop/posts/${id}/replies`, {
          method: 'POST',
          headers: {
            'accept': `*/*`,
            'Content-Type': 'application/json', // Add content type
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: ReplyData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Post request successful:',result);
        setComment("");
        fetchData();  
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form>
        <CommentInput comment={comment} setComment={setComment} />
        <ButtonInput type="button" btnSize="st" bgColor="orange" Text="st"   onClick={handleRegisterComment}>댓글 등록</ButtonInput> 
     </form>
    </div>
  );
};

export default RegisterRepliesPage;
