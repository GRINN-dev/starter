"use client";

import { sdk } from "@/lib/apollo-browser-sdk";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/react-hook-form/form";
import { InputFormField } from "@/components/react-hook-form/input-form-field";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CreateVehicleFormProps {
  //
}

export const CreateVehicleForm: FC<CreateVehicleFormProps> = () => {
  const router = useRouter();
  const formSchema = z.object({
    ownerName: z.string().nonempty(),
    price: z.coerce.number().nonnegative(),
    type: z.string().nonempty(),
    year: z.coerce.number().nonnegative(),
    fuelConsumption: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      price: 0,
      type: "",
      year: 0,
      fuelConsumption: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    await sdk()
      .CreateVehicle({
        input: {
          vehicle: {
            ownerName: data.ownerName,
            price: data.price,
            type: data.type,
            year: data.year,
            fuelConsumption: data?.fuelConsumption,
          },
        },
      })
      .then(() => {
        toast({
          title: "Le véhicule a été créé",
          description: "C'est super !",
        });

        form.reset();

        router.refresh();
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="ownerName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-0 font-bold">Propriétaire</FormLabel>
              <FormDescription className="text-xs m-0">Nom</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="m-0 font-bold">Prix du véhicule</FormLabel>
              <FormDescription className="text-xs m-0">En €</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          name="type"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="m-0 font-bold">Type de véhicule</FormLabel>
              <FormDescription className="text-xs m-0">Catégorie</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          name="year"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="m-0 font-bold">Année du véhicule</FormLabel>
              <FormDescription className="text-xs m-0">AAAA</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          name="fuelConsumption"
          control={form.control}
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel className="m-0 font-bold">Consommation essence</FormLabel>
              <FormDescription className="text-xs m-0">Litres au cent</FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <div className="mt-8 flex gap-2">
            <Button type="submit">Valider</Button>
            <Button
              type="reset"
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
