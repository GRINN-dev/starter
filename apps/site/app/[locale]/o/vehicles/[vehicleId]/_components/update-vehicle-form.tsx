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
import { toast } from "@/components/ui/use-toast";
import { GetVehicleQuery } from "@/graphql";
import { sdk } from "@/lib/apollo-browser-sdk";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  ownerName: z.string().nonempty(),
  price: z.coerce.number().nonnegative(),
  type: z.string().nonempty(),
  year: z.coerce.number().nonnegative(),
  fuelConsumption: z.coerce.number().optional(),
});

export function UpdateVehicleForm({
  vehicle,
}: {
  vehicle: NonNullable<GetVehicleQuery["vehicle"]>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: vehicle.ownerName,
      price: vehicle.price,
      type: vehicle.type,
      year: vehicle.year,
      fuelConsumption: vehicle?.fuelConsumption ?? 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    await sdk()
      .UpdateVehicle({
        input: {
          id: vehicle.id,
          patch: {
            ownerName: data.ownerName,
            price: data.price,
            type: data.type,
            year: data.year,
            fuelConsumption: data?.fuelConsumption ?? 0,
          },
        },
      })

      .then(() => {
        toast({
          title: "maj prise en compte",
          description: "Le véhicule a bien été maj",
        });
        router.refresh();
      });
  };

  return (
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
              <FormDescription className="text-xs m-0">
                Catégorie
              </FormDescription>
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
              <FormLabel className="m-0 font-bold">
                Consommation essence
              </FormLabel>
              <FormDescription className="text-xs m-0">
                Litres au cent
              </FormDescription>
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
