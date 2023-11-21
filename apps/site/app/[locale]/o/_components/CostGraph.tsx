"use client"

import { Bar, BarChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts"

const dataPreviousYear = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 100) + 1,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 100) + 1,
  },
]

const dataCurrentYear = [
    {
      name: "Jan",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "Feb",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "Mar",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "Apr",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "May",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "Jun",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
    {
      name: "Jul",
      totalCurrentYear: Math.floor(Math.random() * 100) + 1,
    },
  ]

const yAxisValues = [25, 50, 75, 100];

export function CostGraph() {

  const combinedData = dataPreviousYear.map((previous, index) => ({
    name: previous.name,
    total: previous.total,
    totalCurrentYear: dataCurrentYear[index].totalCurrentYear,
    //Création d'un tableau d'objet avec mois + totaux pour les deux années
  }));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={combinedData}>

      {yAxisValues.map((value, index) => (
        <ReferenceLine key={index} y={value} stroke="#DDDDE1"/>
        ))}

        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          orientation="right"
        />
        <Bar dataKey="total" fill="#F21866" radius={[4, 4, 0, 0]} />
        <Bar dataKey="totalCurrentYear" fill="#F795B8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}