'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Props = {
  data: { name: string; value: number; color: string }[];
};

export default function CoveragePieChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke="#fff" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontSize: 13,
          }}
          formatter={(value: number) => [
            `${value} (${Math.round((value / total) * 100)}%)`,
            '',
          ]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 13, paddingTop: 10 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}