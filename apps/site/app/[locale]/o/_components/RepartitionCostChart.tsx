"use client";

import { Cell, Legend, Pie, PieChart } from "recharts";

const data = [
  { name: `Voyage d'affaire`, value: 60 },
  { name: "Flotte", value: 25 },
  { name: "Domicile / travail", value: 15 },
];

const COLORS = ["#52525B", "#F21866", "#F795B8"];

export default function RepartitionCostChart() {
  return (
    <PieChart className="m-auto" width={300} height={300}>
      <Pie
        data={data}
        cx={140}
        cy={110}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={2}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        align="center"
        verticalAlign="bottom"
        iconType="circle"
        iconSize={10}
        payload={data.map((entry, index) => ({
          value: entry.name,
          type: "circle",
          color: COLORS[index % COLORS.length],
        }))}
      />
    </PieChart>
  );
}
