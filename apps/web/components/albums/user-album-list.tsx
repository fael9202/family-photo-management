"use client";
import AlbumSkeleton from "./album-skeleton";
import AlbumNotFound from "./album-not-found";
import Pagination from "../ui/pagination";
import AlbumCards from "./album-cards";
import { useUserAlbums } from "@/hooks/use-user-albums";
import messages from "@/utils/messages/pt-br.json";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { useState } from "react";
import AddAlbumModal from "./modal/create-album-modal";

export default function UserAlbumList({
  session,
  paramId,
}: {
  session: Session;
  paramId: number;
}) {
  const { data, isLoading, pagination, setPagination } = useUserAlbums({
    paramId,
  });
  const [addAlbumModalOpen, setAddAlbumModalOpen] = useState(false);

  if (isLoading) {
    return <AlbumSkeleton />;
  }

  if (!data || data.albums.length === 0) {
    return <AlbumNotFound />;
  }

  function verifyIsCurrentUser() {
    if (data?.userName === session.user?.username) {
      return `${data?.userName} ${messages.userAlbums.youAreViewingCurrentUser}`;
    }
    return `${session.user?.username} ${messages.userAlbums.youAreViewing} ${data?.userName}`;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{verifyIsCurrentUser()}</h1>
      </div>
      {data?.userName === session.user?.username && (
        <Button onClick={() => setAddAlbumModalOpen(true)}>
          {messages.albums.add}
        </Button>
      )}
      <AlbumCards
        data={data}
        userId={Number(session.user?.id)}
        token={session.token}
      />
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />
      <AddAlbumModal
        isOpen={addAlbumModalOpen}
        onClose={() => setAddAlbumModalOpen(false)}
        token={session.token}
      />
    </div>
  );
}
