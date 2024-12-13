import UserAlbumList from "@/components/albums/user-album-list";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyAlbumsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <UserAlbumList session={session} paramId={Number(session.user?.id)} />
    </div>
  );
}
