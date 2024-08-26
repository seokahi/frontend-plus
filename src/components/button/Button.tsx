import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgColor?: 'orange' | 'red'| 'gray' | 'blue' |'sp';
  btnSize?: 'sp' | 'st';
  Text?: 'sp' | 'st';
}

const ButtonInput: React.FC<ButtonProps> = ({ children, type = "button", bgColor = 'orange', btnSize = 'st', Text = "st",  ...rest }) => {
  const btnColor = {
    orange: 'bg-orange-500 hover:bg-amber-400',
    red: 'bg-red-500 hover:bg-amber-400',
    gray:'bg-gray-900 hober:bg-amber-400' ,
    blue:'bg-blue-500 hover:bg-blue-400' ,
    sp:'hover:underline',
  };

  const size = {
    sp: 'ml-8',
    st: 'py-1 px-4 ml-2',
  };

  const textStyles = {
    st: 'text-base text-white font-semibold rounded',
    sp: 'text-gray-800',
  };

  return (
    <button className={`${btnColor[bgColor]} ${size[btnSize]} ${textStyles[Text]}`} type={type} {...rest}>
      {children}
    </button>
  );
};

export default ButtonInput;

