import AlbumList from "@/components/albums/album-list";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import messages from "@/utils/messages/pt-br.json";

export default async function UserAlbums() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {messages.common.welcome}, {session.user?.username}
      </h1>
      <p className="mb-4">{session.user?.email}</p>
      <AlbumList userId={session.user?.id} />
    </div>
  );
}
