import { serverSdk } from "@/lib/apollo-server-sdk";
import { UpdateVehicleForm } from "./_components/update-vehicle-form";

export default async function VehiclePage({
  params: { vehicleId },
}: {
  params: { vehicleId: string };
}) {
  const { vehicle } = await serverSdk().GetVehicle({
    id: vehicleId,
  });

  return (
    <main className="container ">
      les infos du vehicule {vehicle?.id}
      {vehicle ? <UpdateVehicleForm vehicle={vehicle} /> : "Pas de véhicule"}
    </main>
  );
}
