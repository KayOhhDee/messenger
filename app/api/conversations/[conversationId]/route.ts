import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {  
      return new Response("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      }, 
      include: {
        users: true
      }
    })

    if (!existingConversation) {
      return new Response("Invalid Conversation ID", { status: 400 });
    }
    
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      },
    })

    existingConversation.users.forEach(user => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:delete", existingConversation);
      }
    })

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}