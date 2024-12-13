import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import messages from "@/utils/messages/pt-br.json";
import AlbumPhotosList from "@/components/photos/album-photos-list";

export default async function AlbumsPage({
  params,
}: {
  params: { albumId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        {messages.common.welcome}, {session.user?.username}
      </h1>
      <AlbumPhotosList session={session} paramId={Number(params.albumId)} />
    </div>
  );
}
