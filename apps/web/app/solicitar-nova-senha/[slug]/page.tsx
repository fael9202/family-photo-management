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
import { CheckCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { newPasswordService } from "@/services/request-new-password/new-password";

const newPasswordSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

type INewPasswordSchema = z.infer<typeof newPasswordSchema>;

export default function NewPasswordForm({
  params,
}: {
  params: { slug: string };
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["postNewPassword"],
    mutationFn: (data: {
      password: string;
      passwordConfirmation: string;
      token: string;
    }) => newPasswordService(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["newPassword"] });
      toast.success(
        data?.message || data?.message || "Senha alterada com sucesso"
      );
      setSuccess(true);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  async function handleNewPassword(data: INewPasswordSchema) {
    setLoading(true);
    await mutation.mutateAsync({
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      token: params.slug,
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
              <div className="text-center animate-fade-in space-y-4">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                <CardTitle className="text-2xl font-semibold text-green-700">
                  Senha Alterada com Sucesso!
                </CardTitle>
                <CardDescription className="text-base">
                  Sua nova senha foi definida. Você já pode fazer login com ela.
                </CardDescription>
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-primary hover:underline mt-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ir para o Login
                </Link>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Definir Nova Senha</CardTitle>
                <CardDescription>
                  Digite e confirme sua nova senha abaixo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleNewPassword)}
                >
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua nova senha"
                        {...register("password")}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Esconder senha" : "Mostrar senha"}
                        </span>
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmar Nova Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua nova senha"
                        {...register("passwordConfirmation")}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Esconder senha"
                            : "Mostrar senha"}
                        </span>
                      </Button>
                    </div>
                    {errors.passwordConfirmation && (
                      <p className="text-sm text-red-500">
                        {errors.passwordConfirmation.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Alterando..." : "Alterar Senha"}
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
