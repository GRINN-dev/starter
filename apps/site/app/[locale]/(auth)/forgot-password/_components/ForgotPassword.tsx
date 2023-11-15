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
import { Loader } from "lucide-react";
import { sdk } from "@/lib/apollo-browser-sdk";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const { forgotPassword } = await sdk().ForgotPassword({
      email: data.email,
    });
    if (forgotPassword?.clientMutationId) {
      toast({
        title: "Un email a été envoyé",
        description: "Un email a été envoyé à l'adresse indiquée",
        variant: "default",
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

            <Button disabled={isLoading || !form.formState.isDirty}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Changer mon mot de passe
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
