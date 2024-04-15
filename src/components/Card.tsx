import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className='mx-auto bg-dark-100 rounded-xl shadow-md overflow-hidden text-center'>
      {children}
    </div>
  );
};

export default Card;
