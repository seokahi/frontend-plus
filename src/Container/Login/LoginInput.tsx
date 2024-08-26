import EmailInput from "../../components/input/EmailInput"
import PasswordInput from "../../components/input/PasswordInput"

interface PasswordProps {
    email:string;
    password:string;
    setPassword: (password:string) => void;
    setEmail: (email:string) => void;
  }


const LoginInput:React.FC<PasswordProps>= ({email,password,setEmail,setPassword}) => {
    return (
        <>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        </>
    )
}

export default LoginInput