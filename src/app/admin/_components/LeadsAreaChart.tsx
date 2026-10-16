'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Props = {
  data: { date: string; count: number }[];
};

export default function LeadsAreaChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontSize: 13,
          }}
          labelStyle={{ color: '#111827', fontWeight: 600 }}
          formatter={(value: any) => [`${value} lead${Number(value) > 1 ? 's' : ''}`, '']}
        />
        <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fill="url(#colorLeads)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}