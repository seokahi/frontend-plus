import React from 'react';

interface TitleProps extends  React.ButtonHTMLAttributes<HTMLButtonElement>{
children: React.ReactNode;
Color?:'gray';
  Size?:  'st';
  Text?: 'st';
}

const Title: React.FC<TitleProps> = ({  children, Size = 'st', Text = "st" ,Color="gray"}) => {
 
    const color=  {
        gray: 'text-gray-700 dark:text-gray-200'
    }
  const size = {
    st: 'text-2xl',
  };

  const textStyles = {
    st: 'font-bold',
  };

  return (
    <h2 className={` ${size[Size]} ${textStyles[Text]} ${color[Color]}`} >
      {children}
    </h2>
  );
};

export default Title;

