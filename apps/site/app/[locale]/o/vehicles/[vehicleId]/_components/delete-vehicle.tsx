"use client"


import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sdk } from "@/lib/apollo-browser-sdk";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DeleteVehicleProps {
    vehicleId:string
  }


const DeleteVehicle:FC<DeleteVehicleProps> = ({vehicleId}) => {
    const router = useRouter();
  
const handleDelete= async () =>{
    await sdk()
    .DeleteVehicle({
        input: {
                id: vehicleId
        }
    }).then(()=>{
        toast({
        title: "Suppression réussi",
          description: "Le véhicule a bien été supprimé",
        });
        router.refresh();
    })
}
    return(
<Button
            size="sm"
            type="button"
            onClick={handleDelete}
            className="mx-auto mb-4"
          >
            Supprimer ce véhicule
            <Trash size={20} />
          </Button>
    )
}

export default DeleteVehicle