import { serverSdk } from "@/lib/apollo-server-sdk";
import { CreateVehicleForm } from "./_components/create-vehicle-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteVehicle from "./[vehicleId]/_components/delete-vehicle";

export default async function VehiclesPage({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const { vehicles } = await serverSdk().GetAllVehicles();

  return (
    <main className="container">
      <h1 className="header-1 my-12 text-center md:text-left">Mes véhicules</h1>

      <div className="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {vehicles?.nodes?.length
          ? vehicles?.nodes.map((vehicle) => (
              <>
                <Card
                  className="mb-8
                  "
                  key={vehicle.id}
                >
                  <CardHeader>
                    <CardTitle className="text-center text-lg underline md:text-xl">
                      Détails du véhicule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <a href={`/${locale}/o/vehicles/${vehicle?.id}`}>
                      <div className="pb-4 border-b-3  hover:bg-gray-50 px-4">
                        <p className="font-bold underline"> Propriétaire </p>
                        <p className="text-muted-foreground ">
                          {vehicle.ownerName}
                        </p>
                      </div>
                      <div className="pb-4 border-b-3 hover:bg-gray-50 px-4">
                        <p className="font-bold underline">Prix</p>
                        <p className="text-muted-foreground ">
                          {vehicle.price}
                        </p>
                      </div>

                      <div className="pb-4 border-b-3 hover:bg-gray-50 px-4">
                        <p className="font-bold underline">Type</p>
                        <p className="text-muted-foreground ">{vehicle.type}</p>
                      </div>

                      <div className="pb-4 border-b-3 hover:bg-gray-50 px-4">
                        <p className="font-bold underline">Année</p>
                        <p className="text-muted-foreground ">{vehicle.year}</p>
                      </div>
                      <div className="pb-4 border-b-3 hover:bg-gray-50 px-4">
                        <p className="font-bold underline">Consommation</p>
                        <p className="text-muted-foreground ">
                          {vehicle.fuelConsumption}
                        </p>
                      </div>
                    </a>
                    <div className="w-full flex">
                      <DeleteVehicle vehicleId={vehicle.id} />
                      </div>
                  </CardContent>
                </Card>
              </>
            ))
          : "pas de véhicule pour l'instant"}
      </div>

      <Card className="my-12 lg:w-[80vh] mx-auto xl:w-[100vh]">
        <CardHeader>
          <CardTitle className="text-xl text-center">Créer un véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateVehicleForm />
        </CardContent>
      </Card>
    </main>
  );
}
