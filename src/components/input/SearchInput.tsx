interface SerachProps {
    keyword:string;
    setKeyword:(keyword:string) => void;
}

const SearchInput:React.FC<SerachProps> = ({keyword,setKeyword}) => {
    return (
        <input
              className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
              type="text"
              value={keyword}
              onChange={(e)=>setKeyword(e.target.value)}
        />
    )
}

export default SearchInput