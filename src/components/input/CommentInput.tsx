

interface PostTitleInputProps {
  comment: string;
  setComment: (comment: string) => void;
}

const CommentInput: React.FC<PostTitleInputProps> = ({ comment, setComment }) => {

  return (
    <div className="mb-4">
      <textarea
        rows={3}
        cols={40}
        className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="내용을 입력하세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
    </div>
  );
};

export default CommentInput;
