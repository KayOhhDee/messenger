"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UserBoxProps {
  data: User;    
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/conversations", {
        userId: data.id,
      });

      router.push(`/conversations/${response.data.id}`);
    } catch (error: any) {
      toast.error(error?.response?.data ?? 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [data, router]);

  return ( 
    <>
      {
        isLoading && <LoadingModal />
      }
      <div onClick={handleClick} className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{ data.name }</p>
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default UserBox;