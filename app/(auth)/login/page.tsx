"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Shield } from "lucide-react";
import { useLogin } from "@/hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: () => {
          // Show success message with longer duration

          console.log("Logged in successfully")
          toast.success("Login successful! Redirecting...", {
            duration: 2000,
          });
          router.push("/dashboard");
         
        },
        onError: () => {
          toast.error("Invalid email or password");
        },
      }
    );
  };

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Daewa Zone Admin</CardTitle>
          <CardDescription>Sign in to manage your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@daewa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
            {error && <p className="text-red-500">{error.message}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
