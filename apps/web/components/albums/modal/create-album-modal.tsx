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
import { addAlbumService } from "@/services/albums/create-album";

const addAlbumSchema = z.object({
  title: z.string().min(3).max(255),
});

type AddAlbumSchema = z.infer<typeof addAlbumSchema>;

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

export default function AddAlbumModal({
  isOpen,
  onClose,
  token,
}: AddAlbumModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAlbumSchema>({
    resolver: zodResolver(addAlbumSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["addAlbum"],
    mutationFn: (data: { title: string; token: string }) =>
      addAlbumService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-albums"] });
      toast.success(
        data?.message || data?.message || "Álbum adicionado com sucesso"
      );
      onClose();
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao adicionar álbum");
    },
  });

  async function handleAddAlbum(data: AddAlbumSchema) {
    setLoading(true);
    await mutation.mutateAsync({
      title: data.title,
      token,
    });
    setLoading(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.albums.addAlbum.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddAlbum)} className="space-y-4">
          <div>
            <Label htmlFor="title">{messages.albums.addAlbum.titleLabel}</Label>
            <Input
              id="title"
              {...register("title")}
              required
              placeholder={messages.albums.addAlbum.titlePlaceholder}
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
