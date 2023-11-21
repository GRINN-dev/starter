"use client"

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from "recharts";

const data = [
  { name: `Voyage d'affaire`, value: 50 },
  { name: 'Flotte', value: 30 },
  { name: 'Domicile / travail', value: 20 },
];

const COLORS = ['#52525B', '#0EA5E9', '#E0F2FE'];

export default function RepartitionEmissionChart(){
    return (
      <PieChart className="m-auto" width={300} height={300}>
      <Pie
        data={data}
        cx={140}
        cy={110}
        innerRadius={60}
        outerRadius={80}
        fill="#52525B"
        dataKey="value"
        paddingAngle={2}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend className='text-xs'
        align="center"
        verticalAlign="bottom"
        iconType="circle"
        iconSize={10}
        payload={data.map((entry, index) => ({
          value: entry.name,
          type: 'circle',
          color: COLORS[index % COLORS.length],
        }))}
        />
      </PieChart>
    );
}