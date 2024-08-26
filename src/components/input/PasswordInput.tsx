
interface PasswordProps {
    password:string;
    setPassword: (password:string) => void;
  }
  
const PasswordInput:React.FC<PasswordProps> = ({password,setPassword}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
    )
}

export default PasswordInput