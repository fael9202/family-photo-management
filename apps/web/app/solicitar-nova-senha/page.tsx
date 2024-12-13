"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { requestNewPasswordService } from "@/services/request-new-password/request-new-password";

const requestNewPasswordSchema = z.object({
  email: z.string().email(),
});

type IRequestNewPasswordSchema = z.infer<typeof requestNewPasswordSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestNewPasswordSchema>({
    resolver: zodResolver(requestNewPasswordSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postRequestNewPassword"],
    mutationFn: (data: { email: string }) => requestNewPasswordService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requestNewPassword"] });
      toast.success(
        data?.message || data?.message || "Email enviado com sucesso"
      );
      setSuccess(true);
    },
    onError: (error) => {
      console.log("Error:", error);
      toast.error(error.toString());
    },
  });

  async function handleRequestNewPassword(data: IRequestNewPasswordSchema) {
    setLoading(true);
    await mutation.mutateAsync({
      email: data.email,
    });
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center"></div>
        <Card className="w-full">
          {success ? (
            <CardContent className="pt-6">
              <div className="text-center animate-fade-in space-y-4 max-w-xs mx-auto">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <CardTitle className="text-2xl font-semibold text-green-700">
                  Email Enviado com Sucesso!
                </CardTitle>
                <CardDescription className="text-base">
                  Verifique sua caixa de entrada para prosseguir com a troca de
                  senha.
                </CardDescription>
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-primary hover:underline mt-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o Login
                </Link>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Trocar de Senha</CardTitle>
                <CardDescription>
                  Digite seu nome de usuário abaixo para solicitar troca de
                  senha
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleRequestNewPassword)}
                >
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@gmail.com"
                      {...register("email")}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        Email é obrigatório
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Carregando..." : "Solicitar"}
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  <Link href="/" className="text-primary hover:underline">
                    Voltar para o Login
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
