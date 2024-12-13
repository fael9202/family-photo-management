"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

import messages from "@/utils/messages/pt-br.json";
import { IAlbum, IAlbumsResponse } from "@/utils/interfaces/albums.interface";
import { Button } from "../ui/button";
import EditAlbumModal from "./modal/edit-album-modal";
import DeleteAlbumModal from "./modal/delete-album-modal";

export default function AlbumCards({
  data,
  userId,
  token,
}: {
  data: IAlbumsResponse;
  userId: number;
  token: string;
}) {
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

  const handleEditClick = (album: IAlbum) => {
    setSelectedAlbum(album);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (albumId: number) => {
    setSelectedAlbum({
      id: albumId,
      title: "",
      userId: 0,
      user: {
        username: "",
        email: "",
        id: 0,
      },
    });
    setDeleteModalOpen(true);
  };

  return (
    <>
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
                    href={`/albuns/${album.id}`}
                    className="text-white hover:underline font-medium"
                  >
                    {messages.albums.viewPhotos}
                  </Link>
                </div>
              )}
            </div>
            <CardHeader>
              <h2 className="text-sm font-extrabold">
                {messages.albums.title}:
              </h2>
              <CardTitle className="line-clamp-1">{album.title}</CardTitle>
              <CardDescription>
                {album.userId === userId ? (
                  <span className="ml-2 text-primary">
                    {messages.albums.yourAlbum}
                  </span>
                ) : (
                  <div className="flex flex-col border p-2 rounded-md">
                    <h2 className="text-sm font-extrabold">
                      {messages.albums.contact}:
                    </h2>
                    {album.user && (
                      <div className="flex flex-col">
                        <p className="text-sm">
                          {messages.albums.username}: {album.user.username}
                        </p>
                        <p className="text-sm">
                          {messages.albums.email}: {album.user.email}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardDescription>
              {album.userId === userId && (
                <div className="flex space-x-2 mb-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditClick(album)}
                  >
                    {messages.albums.edit}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(album.id)}
                  >
                    {messages.albums.delete}
                  </Button>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
      {selectedAlbum && (
        <>
          <EditAlbumModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            token={token}
            id={selectedAlbum.id}
          />
          <DeleteAlbumModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            token={token}
            id={selectedAlbum.id}
          />
        </>
      )}
    </>
  );
}
