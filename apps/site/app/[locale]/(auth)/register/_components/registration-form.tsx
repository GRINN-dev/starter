"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { sdk } from "@/lib/apollo-browser-sdk";
import { Github, Loader } from "lucide-react";
import slugify from "slugify";

const FormSchema = z
  .object({
    email: z.string().email(),
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const res = await sdk().Register({
      email: data.email,

      name: data?.firstname + " " + data.lastname,
      // a random 10char alphanumeric string

      username:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      password: data.password,
    });

    setIsLoading(false);

    if (res?.register) {
      toast({
        title: "Votre compte a bien été créé",
        description: (
          <div>
            <p>
              Un email de confirmation vous a été envoyé à l&apos;adresse{" "}
              <strong>{data.email}</strong>
            </p>
            <p>
              Veuillez cliquer sur le lien de confirmation pour activer votre
              compte
            </p>
          </div>
        ),
      });
    } else {
      toast({
        title: "Une erreur est survenue",
        description: "Impossible de créer votre compte",
        variant: "destructive",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="pierre.durant@acme.com" {...field} />
                  </FormControl>
                  <FormDescription>Votre adresse email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* prénom */}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Pierre" {...field} />
                  </FormControl>
                  <FormDescription>Votre prénom</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* nom */}
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Durant" {...field} />
                  </FormControl>
                  <FormDescription>Votre nom</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>Votre mot de passe</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirmation mot de passe */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation mot de passe</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Confirmez votre mot de passe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading || !form.formState.isDirty}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Inscription
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
