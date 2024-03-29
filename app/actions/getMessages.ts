import prisma from "@/app/libs/prismadb";

const getMessages = async (id: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: id,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return messages;
  } catch (error: any) {
    return []
  }
}

export default getMessages;