import UserList from "@/components/users/users-list";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <p className="mb-4">{session.user?.email}</p>
      <UserList />
    </div>
  );
}
