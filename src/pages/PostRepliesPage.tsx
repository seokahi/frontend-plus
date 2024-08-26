import React, { useEffect, useState } from "react";
import RegisterRepliesPage from "./RegisterRepliesPage";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/User/User";
import CommentInput from "../components/input/CommentInput";
import {PostRepliesProps} from '../type/Type';
import ButtonInput from "../components/button/Button";

const PostRepliesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useRecoilValue(loginState);
  const [editReplyId, setEditReplyId] = useState<number | null>(null);
  const [replies, setReplies] = useState<PostRepliesProps[] | null>(null);
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.fesp.shop/posts/${id}/replies`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Fetch request successful:', result);
      setReplies(result.item);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleRemoveReply = async (_id: number) => {
    try {
      const response = await fetch(`https://api.fesp.shop/posts/${id}/replies/${_id}`, {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleUpdateReply = async (_id: number) => {
    try {
      const response = await fetch(`https://api.fesp.shop/posts/${id}/replies/${_id}`, {
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setEditReplyId(null);
        setComment("");
        fetchData();
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <section className="mb-8">
      {replies && (
        <>
          <h4 className="mt-8 mb-4 ml-2">{`댓글 ${replies.length}개`}</h4>
          {replies.map((reply) => (
            <div key={reply._id} className="shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <img
                  className="w-8 mr-2 rounded-full"
                  src={`https://api.fesp.shop/${reply.user.profile}`}
                  alt={`${reply.user.name} 프로필 이미지`}
                />
                <a href="#" className="text-orange-400">{reply.user.name}</a>
                <time className="ml-auto text-gray-500" dateTime={reply.createAt}>{reply.createAt}</time>
              </div>
              {editReplyId === reply._id ? (
                <div>
                  <CommentInput comment={comment} setComment={setComment} />
                  <ButtonInput type="button" btnSize="st" bgColor="blue" Text="st"   onClick={() => handleUpdateReply(reply._id)}>수정 완료</ButtonInput> 
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-sm">{reply.content}</pre>
              )}
              {reply.user.name === user.name && editReplyId !== reply._id && (
                <div className="flex justify-end">
                    <ButtonInput type="button" btnSize="st" bgColor="gray" Text="st"  onClick={() => { setEditReplyId(reply._id);}}>수정</ButtonInput> 
                    <ButtonInput type="button" btnSize="st" bgColor="red" Text="st" onClick={() => handleRemoveReply(reply._id)}>삭제</ButtonInput> 
               </div>
              )}
            </div>
          ))}
        </>
      )}
      <RegisterRepliesPage comment={comment} setComment={setComment} fetchData={fetchData} />
    </section>
  );
};

export default PostRepliesPage;
