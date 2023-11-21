"use client"

import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
    {
        name: "Ytd",
        total: 400,
        color: '#E0F2FE',
      },
    {
      name: "n-1",
      total: 600,
      color: '#0EA5E9',
    },
    {
      name: "Objectif",
      total: 220,
      color: '#52525B',
    },
  ];


const yAxisValues = [200, 400, 600, 800];

export function MobilityEmissionGraph() {
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