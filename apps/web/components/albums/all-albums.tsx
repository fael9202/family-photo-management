"use client";
import { useAlbums } from "@/hooks/use-albums";
import AlbumSkeleton from "./album-skeleton";
import AlbumNotFound from "./album-not-found";
import Pagination from "../ui/pagination";
import AlbumCards from "./album-cards";

export default function AllAlbums({ userId }: { userId: number }) {
  const { data, isLoading, pagination, setPagination } = useAlbums();
  if (isLoading) {
    return <AlbumSkeleton />;
  }

  if (!data || data.albums.length === 0) {
    return <AlbumNotFound />;
  }

  return (
    <div className="space-y-8">
      <AlbumCards data={data} userId={userId} />
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />
    </div>
  );
}
