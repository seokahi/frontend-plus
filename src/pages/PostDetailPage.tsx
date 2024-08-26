import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostRepliesPage from "./PostRepliesPage";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/User/User";
import ButtonInput from "../components/button/Button";

import { PostDetailProps } from "../type/Type";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetailProps | null>(null);
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.fesp.shop/posts/${id}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Post detail request successful:', result.item, user);
        setPost(result.item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeletePost = async (_id: number) => {
    try {
      const response = await fetch(`https://api.fesp.shop/posts/${_id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('게시글 삭제', result);
      navigate('/info');
    } catch (error) {
      console.log("에러", error);
    }
  }

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        {post ? (
          <>
            <div className="font-semibold text-xl">{`제목 : ${post.title}`}</div>
            <div className="text-right text-gray-400">{`작성자 : ${post.user.name}`}</div>
            <div className="mb-4">
              <div>
                <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{post.content}</pre>
              </div>
              <hr />
            </div>
            <div className="flex justify-end my-4">
              <ButtonInput type="button" btnSize="st" bgColor="orange" Text="st" onClick={() => navigate(`/info`)}>목록</ButtonInput>
              {user._id === post.user._id && (
                <>
                  <ButtonInput type="button" btnSize="st" bgColor="gray" Text="st" onClick={() => navigate(`${location.pathname}/edit`)}>수정</ButtonInput>
                  <ButtonInput type="button" btnSize="st" bgColor="red" Text="st" onClick={() => handleDeletePost(post._id)}>삭제</ButtonInput>
                </>
              )}
            </div>
          </>
        ) : (
          null
        )}
      </section>
      <PostRepliesPage />
    </main>
  );
};

export default PostDetailPage;
