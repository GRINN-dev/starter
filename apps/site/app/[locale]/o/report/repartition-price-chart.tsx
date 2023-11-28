import React, { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, } from "recharts";

export interface RepartitionPriceChartProps {
  // props csvData
  csvData: string[][] | null;
}

const colors = ["#0EA5E9", "#E0F2FE", "#52525B", "#53A7D8", "#70726E"];

const RepartitionPriceChart: React.FC<RepartitionPriceChartProps> = ({ csvData }) => {
  const [dataPriceChart, setDataPriceChart] = useState<any[] | null>(null);

  useEffect(() => {
    const priceRepartition = (data: any[]) => {
      // stockage de la répartition des prix dans un objet
      const categoryPrice: { [category: string]: number } = {};
      
      data.slice(1).forEach((row) =>{
        const category = row[3];
        const price = parseFloat(row[4]);

        if (!isNaN(price)) {
        if (categoryPrice[category]) {

          //Si la catégorie existe déjà, on ajoute le prix
          categoryPrice[category] += price;
        } else {
          // Sinon on ajoute le prix comme première valeur
          categoryPrice[category] = price;
        }
      };
    });

      // Calcul du total des prix
      const totalPrices = Object.values(categoryPrice).reduce((sum, price) => sum + price, 0);

      // Conversion en pourcentages
      const percentages = Object.fromEntries(
        Object.entries(categoryPrice).map(([category, price]) => [
          category,
          ((price / totalPrices) * 100).toFixed(2),
        ])
      );
      return percentages;   
    };

    if (csvData) {
      const percentages = priceRepartition(csvData);
      const dataPriceChart = Object.entries(percentages).map(([label, value]) => ({
        label,
        value: parseFloat(value),
      }));
      setDataPriceChart(dataPriceChart);
    }
  }, [csvData]);

  return (
    <>
      {dataPriceChart && (
        <>
          <ResponsiveContainer className="m-auto" width={300} height={300}>
            <PieChart width={400} height={400}>
              <Pie
                data={dataPriceChart}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {dataPriceChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Legend
                align="center"
                verticalAlign="bottom"
                iconType="circle"
                iconSize={10}
                payload={dataPriceChart.map((entry, index) => ({
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


export default RepartitionPriceChart