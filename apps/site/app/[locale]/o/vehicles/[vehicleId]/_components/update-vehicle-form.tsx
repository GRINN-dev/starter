"use client";

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
import { Input } from "@/components/ui/input";
import { GetVehicleQuery } from "@grinn/codegen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ownerName: z.string(),
});
export function UpdateVehicleForm({
  vehicle,
}: {
  vehicle: NonNullable<GetVehicleQuery["vehicle"]>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: vehicle.ownerName,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="ownerName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Propriétaire</FormLabel>
              <FormDescription>toto</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8">
          <Button type="submit">Modifier</Button>
        </div>
      </form>
    </Form>
  );
}
