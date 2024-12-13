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
import { addPhotoService } from "@/services/photos/create-photo";

const addPhotoSchema = z.object({
  title: z.string().min(3).max(255),
});

type AddPhotoSchema = z.infer<typeof addPhotoSchema>;

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  albumId: number;
}

export default function AddPhotoModal({
  isOpen,
  onClose,
  token,
  albumId,
}: AddPhotoModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPhotoSchema>({
    resolver: zodResolver(addPhotoSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["addPhoto"],
    mutationFn: (data: { title: string; token: string; albumId: number }) =>
      addPhotoService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["album-photos"] });
      toast.success(
        data?.message || data?.message || "Foto adicionada com sucesso"
      );
      onClose();
      router.refresh();
    },
    onError: () => {
      toast.error("Erro ao adicionar foto");
    },
  });

  async function handleAddPhoto(data: AddPhotoSchema) {
    setLoading(true);
    await mutation.mutateAsync({
      title: data.title,
      token,
      albumId,
    });
    setLoading(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.photo.addPhoto.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddPhoto)} className="space-y-4">
          <div>
            <Label htmlFor="title">{messages.photo.addPhoto.titleLabel}</Label>
            <Input
              id="title"
              {...register("title")}
              required
              placeholder={messages.photo.addPhoto.titlePlaceholder}
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
