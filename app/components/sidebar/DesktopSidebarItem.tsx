'use client';

import clsx from "clsx";
import Link from "next/link";

interface DesktopSidebarItemProps {
  name: string;
  path: string;
  icon: React.ElementType;
  active: boolean | undefined;
  onClick?: () => void;
}

const DesktopSidebarItem: React.FC<DesktopSidebarItemProps> = ({
  name,
  path,
  icon: Icon,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return ( 
    <li onClick={handleClick}>
      <Link href={path} className={clsx(`
        group
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}>
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{name}</span>
      </Link>
    </li>
  );
}
 
export default DesktopSidebarItem;