import { Link } from 'react-router-dom';

interface NavLinkProps {
  path: string;
  text: string;
}

const NavLink = ({ path, text }: NavLinkProps) => {
  return (
    <div className='absolute top-0 left-0 m-4'>
      <Link className='text-lightBlue underline' to={path}>
        {text}
      </Link>
    </div>
  );
};

export default NavLink;
