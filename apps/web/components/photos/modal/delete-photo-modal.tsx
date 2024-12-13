"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import messages from "@/utils/messages/pt-br.json";

interface DeletePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photoId: number;
}

export default function DeletePhotoModal({
  isOpen,
  onClose,
  photoId,
}: DeletePhotoModalProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/photos/${photoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onClose();
      router.refresh();
    } else {
      // Handle error
      console.error("Failed to delete photo");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.photo.confirmDelete}</DialogTitle>
        </DialogHeader>
        <p>{messages.photo.deleteWarning}</p>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {messages.common.cancel}
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            {messages.common.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
