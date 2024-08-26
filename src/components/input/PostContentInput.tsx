interface PostContentInputProps {
    content:string;
    setContent:(content:string) => void;
}

const PostContentInput:React.FC<PostContentInputProps> = ({content,setContent}) => {
    return (
        <div className="my-4">
        <label className="block text-lg content-center" htmlFor="content">내용</label>
        <textarea 
          id="content"
          rows={15} 
          placeholder="내용을 입력하세요."
          className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        ></textarea>
        
      </div>
    )
}

export default PostContentInput