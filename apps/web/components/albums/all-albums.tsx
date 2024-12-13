"use client";
import { useAlbums } from "@/hooks/use-albums";
import AlbumSkeleton from "./album-skeleton";
import AlbumNotFound from "./album-not-found";
import Pagination from "../ui/pagination";
import AlbumCards from "./album-cards";
import { Session } from "next-auth";

export default function AllAlbums({ userId, session }: { userId: number, session: Session }) {
  const { data, isLoading, pagination, setPagination } = useAlbums(session);
  if (isLoading) {
    return <AlbumSkeleton />;
  }

  if (!data || data.albums.length === 0) {
    return <AlbumNotFound />;
  }

  return (
    <div className="space-y-8">

      
      <AlbumCards data={data} userId={userId} token={session.token} />
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />
    </div>
  );
}
