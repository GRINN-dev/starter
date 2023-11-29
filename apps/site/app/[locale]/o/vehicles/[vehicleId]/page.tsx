import { serverSdk } from "@/lib/apollo-server-sdk";
import { UpdateVehicleForm } from "./_components/update-vehicle-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <h1 className="header-1 my-12 text-center">Mon véhicule</h1>
      <Card className="lg:w-[80vh] mx-auto xl:w-[100vh]" >
        <CardHeader>
          <CardTitle className="text-xl text-center ">Les infos du vehicule <span className="text-[#F21866]">{vehicle?.id}</span></CardTitle>
        </CardHeader>
        <CardContent>
          {vehicle ? (
            <UpdateVehicleForm vehicle={vehicle} />
          ) : (
            "Pas de véhicule"
          )}
        </CardContent>
      </Card>
    </main>
  );
}
