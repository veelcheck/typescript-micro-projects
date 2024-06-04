import { useState } from 'react';
import { Link } from 'react-router-dom';

const linkStyle = 'bg-amber-50 px-4 py-1 rounded-sm';
const listItemStyle = 'flex flex-col w-40 rounded-sm relative relative group';

type ProjectLinkProps = {
  to: string;
  title: string;
  description: string;
};

function ProjectLink({ to, title, description }: ProjectLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={listItemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link
        className={linkStyle}
        to={to}>
        {title}
      </Link>
      {isHovered && (
        <div className='hidden sm:block absolute sm:top-0 sm:left-44 w-full sm:p-2 bg-gray-800 text-amber-50 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          {description}
        </div>
      )}
    </li>
  );
}

export default ProjectLink;
