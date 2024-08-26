interface NameProps {
  name:string;
  setName: (name:string) => void;
}

const NameInput:React.FC<NameProps> = ({name,setName})=> {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={name}
              onChange={(e)=>setName(e.target.value)}/>
          </div>
    )
}

export default NameInput