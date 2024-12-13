"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
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
import { signIn } from "next-auth/react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const loginSchema = z.object({
  username: z.string().toLowerCase(),
  password: z.string().min(1),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: ILoginSchema) {
    setLoading(true);
    const result = await toast.promise(
      signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      }),
      {
        pending: "Validando credenciais...",
      }
    );
    if (result?.status && result.status === 200) {
      toast.success("Login efetuado com sucesso");
      router.replace("home");
    } else {
      if (result?.error) {
        toast.error(result.error); // Mostra a mensagem de erro do backend
      }
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center w-full h-screen flex-col">
      <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10"></div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu nome de usuário abaixo para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(handleLogin)}>
            <div className="grid gap-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="joao gomes"
                {...register("username")}
                required
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">
                Nome de usuário é obrigatório
              </p>
            )}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/solicitar-nova-senha"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Troca o tipo de input
                  {...register("password")}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} // Alterna o estado de exibição da senha
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">Senha é obrigatória</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Não possui uma conta?{" "}
            <Link href="" className="underline">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
