"use client"

import { sdk } from "@/lib/apollo-browser-sdk";
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form";
import { InputFormField } from "@/components/react-hook-form/input-form-field";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface CreateVehicleFormProps{
    //
}

export const CreateVehicleForm:FC<CreateVehicleFormProps>=()=>{
    const router = useRouter();
    const formSchema = z.object({
            ownerName: z.string().nonempty(),
            price: z.coerce.number().nonnegative() ,
            type: z.string().nonempty() ,
            year: z.coerce.number().nonnegative() ,
            fuelConsumption: z.coerce.number().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        console.log(data)

        await sdk().CreateVehicle({
          input: {
            vehicle: {
              ownerName: data.ownerName,
              price: data.price,
              type: data.type,
              year: data.year,
              fuelConsumption: data?.fuelConsumption,
            },
          },
        }).then(() => {
            toast({
                title:"Le véhicule a été créé",
                description:"C'est super !",
            });
            console.log(toast)

            router.refresh()
        });
 
    }

return(
    <div>
        <h1>Formulaire</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
                <InputFormField
                 name="ownerName"
                 label="Nom du propriétaire"
                 control={form.control}
                 type="text"
                 placeholder="Nom"
                 />
            </div>
            <div>
                <InputFormField 
                name="type"
                label="Type de véhicule"
                control={form.control}
                type="text"
                placeholder="Catégorie de véhicule"
                />
            </div>
            <div>
                <InputFormField
                name="price"
                label="Prix"
                control={form.control}
                type="number"
                placeholder="Prix en €"
                />
            </div>
            <div>
                <InputFormField 
                name="year"
                label="Année du véhicule"
                control={form.control}
                type="number"
                placeholder="Année"
                />
            </div>
            <div>
                <InputFormField 
                name="fuelConsumption"
                label="Consommation d'essence"
                control={form.control}
                type="number"
                placeholder="Consommation en L"
                />
            </div>
            <Button type="submit">Valider</Button>
        </form>
        </Form>
    </div>
)
}