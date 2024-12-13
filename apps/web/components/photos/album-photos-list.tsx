"use client";
import Pagination from "../ui/pagination";
import AlbumCards from "./photo-cards";
import messages from "@/utils/messages/pt-br.json";
import { Session } from "next-auth";
import { useAlbumPhotos } from "@/hooks/use-album-photos";
import AlbumPhotosSkeleton from "./album-photos-skeleton";
import AlbumPhotoNotFound from "./album-photo-not-found";
import { Button } from "../ui/button";
import { useState } from "react";
import AddPhotoModal from "./modal/create-photo-modal";

export default function AlbumPhotosList({
  session,
  paramId,
}: {
  session: Session;
  paramId: number;
}) {
  const { data, isLoading, pagination, setPagination } = useAlbumPhotos({
    paramId,
  });
  const [addPhotoModalOpen, setAddPhotoModalOpen] = useState(false);

  if (isLoading) {
    return <AlbumPhotosSkeleton />;
  }

  if (!data || data.photos.length === 0) {
    return <AlbumPhotoNotFound />;
  }

  function verifyIsCurrentUser() {
    if (data?.album.user.username === session.user?.username) {
      return `${data?.album.user.username} ${messages.photo.youAreViewingCurrentUser} ${messages.photo.fromAlbum}: ${data?.album.title}`;
    }
    return `${session.user?.username} ${messages.photo.youAreViewing} ${data?.album.user.username} ${messages.photo.fromAlbum}: ${data?.album.title}`;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{verifyIsCurrentUser()}</h1>
      </div>
      {data?.album.user.username === session.user?.username && (
        <Button onClick={() => setAddPhotoModalOpen(true)}>
          {messages.photo.add}
        </Button>
      )}
      <AlbumCards
        data={data}
        userId={Number(session.user?.id)}
        contact={{
          email: data?.album.user.email || "",
          username: data?.album.user.username || "",
        }}
        token={session.token}
      />
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />
      <AddPhotoModal
        isOpen={addPhotoModalOpen}
        onClose={() => setAddPhotoModalOpen(false)}
        token={session.token}
        albumId={Number(paramId)}
      />
    </div>
  );
}
