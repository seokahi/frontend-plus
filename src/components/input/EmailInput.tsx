interface EmailProps {
    email:string;
    setEmail: (email:string) => void;
  }

const EmailInput :React.FC<EmailProps> = ({ email, setEmail }) => {

    
    return (
        <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    )
}

export default EmailInput