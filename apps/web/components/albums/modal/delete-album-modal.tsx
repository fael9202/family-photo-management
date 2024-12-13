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
import {} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { deleteAlbumService } from "@/services/albums/delete-album";

interface DeleteAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  id: number;
}

export default function DeleteAlbumModal({
  isOpen,
  onClose,
  token,
  id,
}: DeleteAlbumModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteAlbum"],
    mutationFn: (data: { token: string; id: number }) =>
      deleteAlbumService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-albums"] });
      toast.success(
        data?.message || data?.message || "Foto excluida com sucesso"
      );
      onClose();
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao excluir foto");
    },
  });

  async function handleDeletePhoto() {
    setLoading(true);
    await mutation.mutateAsync({
      token,
      id,
    });
    setLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.albums.deleteAlbum.title}</DialogTitle>
        </DialogHeader>
        <p>{messages.albums.deleteAlbum.warning}</p>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {messages.common.cancel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeletePhoto}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2" /> : null}
            {messages.common.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
