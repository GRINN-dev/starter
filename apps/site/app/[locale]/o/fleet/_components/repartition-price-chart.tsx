import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, } from "recharts";

export interface RepartitionCarChartProps {
  //props csvData
  csvData: string[][] | null;
}


const colors = ["#F795B8", "#F21866", "#52525B", "#FD6C9E", "#70726E"];

const RepartitionCarChart: React.FC<RepartitionCarChartProps> = ({ csvData }) => {
  const [dataChart, setDataChart] = useState<any[] | null>(null);

  useEffect(() => {
    const Percent = (data: any[]) => {
      //compte le nombre  par catégorie
      const Count: { [category: string]: number } = {};
      data.slice(1).forEach((row) => {
        const category = row[3];
        //maj du compteur : incrémentation (si la catégorie existe) 
        Count[category] = (Count[category]||0) + 1;
      });
      
      //nbre total de voiture
      const totalCars = data.length;
      //transforme Count en objet
      const percentages = Object.fromEntries(
        //transforme  Count en tableau catégorie + nbr
        Object.entries(Count).map(([category, count]) => [
          category,
          ((count / totalCars) * 100).toFixed(2),
        ])
      );

      return percentages;
    };

    if (csvData) {
      const percentages = Percent(csvData);
      const dataChart = Object.entries(percentages).map(([label, value]) => ({
        label,
        value: parseFloat(value),
      }));
      setDataChart(dataChart);
    }
  }, [csvData]);

  return (
    <>

      {dataChart && (
        <>
        <ResponsiveContainer className="m-auto" width={300} height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={dataChart}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
          >
            {dataChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend
            align="center"
            verticalAlign="bottom"
            iconType="circle"
            iconSize={10}
            payload={dataChart.map((entry, index) => ({
              value: entry.label,
              type: "circle",
              color: colors[index % colors.length],
            }))}
          />
        </PieChart>
        </ResponsiveContainer>
        </>
      )}
      </>
  );
};

export default RepartitionCarChart;