"use client"

import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Ytd",
        total: 400,
        color: '#F795B8',
      },
    {
      name: "n-1",
      total: 600,
      color: '#F21866',
    },
    {
      name: "Objectif",
      total: 390,
      color: '#52525B',
    },
  ];


const yAxisValues = [200, 400, 600, 800];

export function MobilityCostGraph() {
  return (
    <ResponsiveContainer width={300} height={300}>
      <BarChart data={data}>

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

        <Bar dataKey="total" barSize={40}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
        
      </BarChart>
    </ResponsiveContainer>
  )
}