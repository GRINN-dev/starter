import { serverSdk } from "@/lib/apollo-server-sdk";
import { CreateVehicleForm } from "./_components/create-vehicle-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function VehiclesPage() {
  const { vehicles } = await serverSdk().GetAllVehicles();

  return (
    <main className="container">
      <h1 className="header-1 mt-12">Mes véhicules</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tous mes véhicules</CardTitle>
        </CardHeader>
        <CardContent>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Owner</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.nodes?.length
                ? vehicles?.nodes.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.ownerName}</td>
                      <td>{vehicle.price}</td>
                    </tr>
                  ))
                : "pas de véhicule pour l'instant"}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Créer un véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateVehicleForm />
        </CardContent>
      </Card>
    </main>
  );
}
