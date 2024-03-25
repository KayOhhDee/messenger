"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    try {
      axios.post(`/api/conversations/${conversationId}/seen`)
    } catch (error) {
      console.error(error);
    }
  }, [conversationId])

  return ( 
    <div className="flex-1 overflow-y-auto">
      {
        messages.map((message, index) => (
          <MessageBox key={index} message={message} isLast={index === messages.length - 1} />
        ))
      }
      <div ref={bottomRef} className="pt-4" />
    </div>
  );
}
 
export default Body;