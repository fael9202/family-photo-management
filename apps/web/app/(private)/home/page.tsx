import AlbumList from "@/components/albums/album-list";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import messages from "@/utils/messages/pt-br.json";
async function getUser(userId) {
  // This would be replaced with an actual API call
  const users = [
    { id: "1", username: "user1", email: "user1@example.com" },
    { id: "2", username: "user2", email: "user2@example.com" },
  ];
  return users.find((user) => user.id === userId);
}

async function getAlbums(userId) {
  // This would be replaced with an actual API call
  return [
    { id: 1, title: "Album 1" },
    { id: 2, title: "Album 2" },
  ];
}

export default async function UserAlbums() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (!session) {
    redirect("/");
  }

  const albums = await getAlbums(session.user?.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {messages.common.welcome}, {session.user?.username}
      </h1>
      <p className="mb-4">{session.user?.email}</p>
      <AlbumList albums={albums} userId={session.user?.id} />
    </div>
  );
}
