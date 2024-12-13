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
import { Textarea } from "@/components/ui/textarea";
import messages from "@/utils/messages/pt-br.json";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editPhotoService } from "@/services/photos/edit-photo";
import { Loader2 } from "lucide-react";

const editPhotoSchema = z.object({
  title: z.string().min(3).max(255),
});

type EditPhotoSchema = z.infer<typeof editPhotoSchema>;

interface EditPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  id: number;
}

export default function EditPhotoModal({
  isOpen,
  onClose,
  token,
  id,
}: EditPhotoModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPhotoSchema>({
    resolver: zodResolver(editPhotoSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["editPhoto"],
    mutationFn: (data: { title: string; token: string; id: number }) =>
      editPhotoService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["album-photos"] });
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

  async function handleEditPhoto(data: EditPhotoSchema) {
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
          <DialogTitle>{messages.photo.editPhoto.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditPhoto)} className="space-y-4">
          <div>
            <Label htmlFor="title">{messages.photo.editPhoto.titleLabel}</Label>
            <Input
              id="title"
              {...register("title")}
              required
              placeholder={messages.photo.editPhoto.titlePlaceholder}
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
