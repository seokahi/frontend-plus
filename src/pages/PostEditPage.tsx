import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import PostContentInput from "../components/input/PostContentInput";
import PostTitleInput from "../components/input/PostITitlenput";
import { loginState } from "../recoil/User/User";

const PostEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const location = useLocation();
  const handleEditPost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("헬로",title,content);
    console.log(location.pathname,"흐음",location.pathname.split("/edit"));
    const redirectUrl = location.pathname.split("/edit")[0];
    const EditData = JSON.stringify({
      "title": title,
      "content": content,
      "extra":""
    });

    try {
      console.log(EditData,"editdata")
      const response = await fetch(`https://api.fesp.shop/posts/${id}`, {
        method: 'PATCH',
        headers: {
          "accept": 'application/json',
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json"
        },
        body: EditData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Post Edit request successful:', result);
      navigate(`${redirectUrl}`);

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 수정</h2>
      </div>
      <section className="mb-8 p-4">
        <form>
          <PostTitleInput title={title} setTitle={setTitle} />
          <PostContentInput content={content} setContent={setContent} />
          <hr />
          <div className="flex justify-end my-6">
            
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={handleEditPost}
            >
              수정
            </button>
            <button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default PostEditPage;
