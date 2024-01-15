import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveDown, MoveUp } from "lucide-react";
import { Co2Graph } from "./_components/Co2Graph";
import { CostGraph } from "./_components/CostGraph";
import { MobilityCostGraph } from "./_components/MobilityCostGraph";
import { MobilityEmissionGraph } from "./_components/MobilityEmissionGraph";
import RepartitionCostChart from "./_components/RepartitionCostChart";
import RepartitionEmissionChart from "./_components/RepartitionEmissionChart";
import { CalendarDatePicker } from "./_components/CalendarDatePicker";

const data = [
  {
    name: "200",
    icon: <MoveDown />,
    percent: "12%",
    text: "Utilisateurs",
    isUp: false,
  },
  {
    name: "150",
    icon: <MoveDown />,
    percent: "20.2%",
    text: "Véhicules",
    isUp: false,
  },
  {
    name: "60",
    icon: <MoveDown />,
    percent: "8%",
    text: "Titres Mobilités",
    isUp: false,
  },
  {
    name: "45%",
    icon: <MoveUp />,
    percent: "11.2%",
    text: "Obj. de réduction de coûts",
    isUp: true,
  },
  {
    name: "52.5%",
    icon: <MoveUp />,
    percent: "5.5%",
    text: "Obj. de réduction émissions de CO2",
    isUp: true,
  },
];

const Dashboard = () => {
  return (
    <main className="flex flex-col w-full container">
      <h1 className="text-3xl font-bold tracking-tight ml-6 my-6 self-start">
        Dashboard
      </h1>
      <div className=" mx-2 rounded-xl border bg-card text-card-foreground shadow max-w-full flex-col flex-wrap lg:flex lg:flex-row lg:flex-nowrap lg:place-content-around">
        {data.map((value, index) => (
          <Card
            key={index}
            className=" grid md:grid-cols-3  border-0 rounded-none shadow-none items-center w-full lg:w-fit"
          >
            <CardHeader className="px-0 py-6 text-center">
              <CardTitle className="text-2xl font-bold">
                {" "}
                {value.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-center p-0 w-full">
              <div
                className={`${
                  value.isUp ? "text-[#59D386]" : "text-[#F21866]"
                } text-xs`}
              >
                {" "}
                {value.icon} {value.percent}
              </div>
            </CardContent>
            <p className="text-sm text-muted-foreground col-span-3">
              {" "}
              {value.text}
            </p>
          </Card>
        ))}
      </div>
      <CalendarDatePicker />
      <div className="flex max-w-full flex-col flex-wrap xl:flex-row xl:flex-nowrap xl:place-content-around">
        <Card className="my-4 md:px-4 mx-2">
          <CardHeader className="items-center text-lg">
            <CardTitle>Coûts</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className=" flex flex-wrap justify-center lg:justify-between xl:flex-nowrap">
              <div>
                <h2 className="font-bold mb-5 text-center">
                  Coût total des mobilités
                </h2>
                <MobilityCostGraph />
              </div>
              <div>
                <h2 className="font-bold mb-5 ml-2 text-center ">
                  Répartition des coûts
                </h2>
                <RepartitionCostChart />
              </div>
            </div>
            <div>
              <h2 className="font-bold my-5 text-center">Évolution</h2>
              <CostGraph />
            </div>
          </CardContent>
        </Card>
        <Card className="my-4 md:px-4">
          <CardHeader className="items-center text-lg">
            <CardTitle>Émissions de CO2</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className=" flex flex-wrap justify-center lg:justify-between xl:flex-nowrap">
              <div>
                <h2 className="font-bold mb-5 text-center">
                  Émission totales des mobilités
                </h2>
                <MobilityEmissionGraph />
              </div>
              <div>
                <h2 className="font-bold mb-5 text-center">
                  Répartition des coûts
                </h2>
                <RepartitionEmissionChart />
              </div>
            </div>
            <div>
              <h2 className="font-bold my-5 text-center">Évolution</h2>
              <Co2Graph />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
