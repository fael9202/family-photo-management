"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import messages from "@/utils/messages/pt-br.json";
import { IPhotoAlbum } from "@/utils/interfaces/photo-albums.interface";
import EditPhotoModal from "./modal/edit-photo-modal";
import DeletePhotoModal from "./modal/delete-photo-modal";

export default function PhotoCards({
  data,
  userId,
  contact,
}: {
  data: IPhotoAlbum;
  userId: number;
  contact?: {
    email: string;
    username: string;
  };
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  const handleEditClick = (photo: {
    id: number;
    title: string;
    description: string;
  }) => {
    setSelectedPhoto(photo);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (photoId: number) => {
    setSelectedPhoto({ id: photoId, title: "", description: "" });
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden transition-shadow hover:shadow-lg relative"
          >
            <div className="relative h-48 bg-gray-100">
              <div className="relative w-full h-full">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <CardHeader>
              <h2 className="text-sm font-extrabold">
                {messages.photo.title}:
              </h2>
              <CardTitle className="line-clamp-1">{photo.title}</CardTitle>
              <CardDescription>
                {photo.albumId === userId ? (
                  <span className="ml-2 text-primary">
                    {messages.photo.yourPhoto}
                  </span>
                ) : (
                  <div className="flex flex-col border p-2 rounded-md">
                    <h2 className="text-sm font-extrabold">
                      {messages.albums.contact}:
                    </h2>
                    {contact && (
                      <div className="flex flex-col">
                        <p className="text-sm">
                          {messages.photo.username}: {contact.username}
                        </p>
                        <p className="text-sm">
                          {messages.photo.email}: {contact.email}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardDescription>
              {photo.albumId === userId && (
                <div className="flex space-x-2 mb-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditClick(photo)}
                  >
                    {messages.photo.edit}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteClick(photo.id)}
                  >
                    {messages.photo.delete}
                  </Button>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
      {selectedPhoto && (
        <>
          <EditPhotoModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            photo={selectedPhoto}
          />
          <DeletePhotoModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            photoId={selectedPhoto.id}
          />
        </>
      )}
    </>
  );
}
