
interface PostTitleInputProps {
  title:string;
  setTitle:(title:string) =>void;
  
}
const PostTitleInput:React.FC<PostTitleInputProps> = ({title,setTitle}) => {
    return (
        <div className="my-4">
              <label className="block text-lg content-center" htmlFor="title">제목</label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요." 
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
            </div>
    )
}

export default PostTitleInput