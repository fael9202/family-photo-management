"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import messages from "@/utils/messages/pt-br.json";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { editAlbumService } from "@/services/albums/edit-album";

const editAlbumSchema = z.object({
  title: z.string().min(3).max(255),
});

type EditAlbumSchema = z.infer<typeof editAlbumSchema>;

interface EditAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  id: number;
}

export default function EditAlbumModal({
  isOpen,
  onClose,
  token,
  id,
}: EditAlbumModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAlbumSchema>({
    resolver: zodResolver(editAlbumSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["editPhoto"],
    mutationFn: (data: { title: string; token: string; id: number }) =>
      editAlbumService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-albums"] });
      toast.success(
        data?.message || data?.message || "Foto editada com sucesso"
      );
      onClose();
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao editar foto");
    },
  });

  async function handleEditAlbum(data: EditAlbumSchema) {
    setLoading(true);
    await mutation.mutateAsync({
      title: data.title,
      token,
      id,
    });
    setLoading(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.albums.editAlbum.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditAlbum)} className="space-y-4">
          <div>
            <Label htmlFor="title">{messages.albums.editAlbum.titleLabel}</Label>
            <Input
              id="title"
              {...register("title")}
              required
              placeholder={messages.albums.editAlbum.titlePlaceholder}
            />
          </div>
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {messages.common.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2" /> : null}
              {messages.common.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
