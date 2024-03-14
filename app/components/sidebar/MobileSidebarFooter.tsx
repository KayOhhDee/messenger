"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileSidebarFooterItem from "./MobileSidebarFooterItem";

const MobileSidebarFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return ( 
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden">
      {
        routes.map((route, index) => (
          <MobileSidebarFooterItem 
            key={route.name}
            path={route.path}
            icon={route.icon}
            active={route.active}
            onClick={route.onClick}
          />
        ))
      }
    </div>
  );
}
 
export default MobileSidebarFooter;