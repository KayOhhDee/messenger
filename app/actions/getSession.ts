import { getServerSession } from "next-auth";

import { authOptions } from '@/app/libs/authOptions';

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
