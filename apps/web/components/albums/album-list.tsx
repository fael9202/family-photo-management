"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAlbums } from "@/hooks/use-albums";
import { ImageIcon } from "lucide-react";
import AlbumSkeleton from "./album-skeleton";
import AlbumNotFound from "./album-not-found";
import Pagination from "../ui/pagination";
import messages from "@/utils/messages/pt-br.json";

export default function AlbumList({ userId }: { userId: number }) {
  const { data, isLoading, pagination, setPagination } = useAlbums();
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);

  if (isLoading) {
    return <AlbumSkeleton />;
  }

  if (!data || data.albums.length === 0) {
    return <AlbumNotFound />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.albums.map((album) => (
          <Card
            key={album.id}
            className="overflow-hidden transition-shadow hover:shadow-lg relative"
            onMouseEnter={() => setHoveredAlbum(album.id.toString())}
            onMouseLeave={() => setHoveredAlbum(null)}
          >
            <div className="relative h-48 bg-gray-100">
              <ImageIcon
                className="absolute inset-0 m-auto text-gray-300"
                size={48}
              />
              {hoveredAlbum === album.id.toString() && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Link
                    href={`/albums/${album.id}`}
                    className="text-white hover:underline font-medium"
                  >
                    {messages.albums.viewPhotos}
                  </Link>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{album.title}</CardTitle>
              <CardDescription>
                {album.userId === userId && (
                  <span className="ml-2 text-primary">
                    {messages.albums.yourAlbum}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        data={data}
      />
    </div>
  );
}
