import UserAlbumList from "@/components/albums/user-album-list";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserAlbumsPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <UserAlbumList
        session={session}
        paramId={Number(params.userId)}
      />
    </div>
  );
}
