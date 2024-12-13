import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import messages from "@/utils/messages/pt-br.json";
import AllAlbums from "@/components/albums/all-albums";

export default async function AlbumsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {messages.common.welcome}, {session.user?.username}
      </h1>
      <AllAlbums userId={session.user?.id} session={session} />
    </div>
  );
}
