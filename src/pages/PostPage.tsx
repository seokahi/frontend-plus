
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '../components/input/SearchInput';
import Pagination from '../components/Pagnation';


import { PostDetailProps } from "../type/Type";


const PostPage: React.FC = () => {
  const [posts, setPosts] = useState<PostDetailProps[] | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const params = new URLSearchParams(location.search);
    const search = params.get("keyword");
    console.log("search", search, currentPage);

    try {
      const ApiUrl = search !== null
        ? `https://api.fesp.shop/posts/?keyword=${search}&page=${currentPage}&limit=20`
        : `https://api.fesp.shop/posts/?page=${currentPage}&limit=20`;
      const response = await fetch(ApiUrl, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Post request successful:', result);

      setPosts(result.item);
      setTotalPage(result.pagination.totalPages);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };



  const handleSearch = () => {
    setCurrentPage(1)
    navigate(`/info?keyword=${keyword}`);
  }

  useEffect(() => {
    console.log("location changed", location.search);
    fetchData();
  }, [location,currentPage]);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">정보 공유</h2>
      </div>
      <div className="flex justify-end mr-4">
        <form>
          <SearchInput keyword={keyword} setKeyword={setKeyword} />
          <button type="submit" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={(e) => { e.preventDefault(); handleSearch(); }}>검색</button>
        </form>
        <button type="button" className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded" onClick={() => navigate('/info/new')}>글작성</button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">조회수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">댓글수</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">작성일</th>
            </tr>
          </thead>

          {posts?.map((post, index) => (
            <tbody key={index} onClick={() => { navigate(`/info/${post._id}`) }}>
              <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 truncate indent-4 cursor-pointer">{post.title}</td>
                <td className="p-2 text-center truncate">{post.user.name}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.repliesCount}</td>
                <td className="p-2 truncate text-center hidden sm:table-cell">{post.createdAt}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <hr />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} keyword={keyword} />
      </section>
    </main>
  )
}

export default PostPage;
