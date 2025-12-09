"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendPoint } from "@/types/dashboard";

interface TrendAreaChartProps {
  data: TrendPoint[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function TrendAreaChart({ data }: TrendAreaChartProps) {
  if (!data.length) {
    return <div className="text-sm text-slate-400">Sin datos suficientes</div>;
  }
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4c79ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4c79ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#475569" fontSize={12} tickFormatter={formatCurrency} tickLine={false} axisLine={false} width={80} />
          <Tooltip cursor={false} formatter={value => formatCurrency(Number(value))} labelFormatter={label => label.toString()} />
          <Area type="monotone" dataKey="value" stroke="#4c79ff" fillOpacity={1} fill="url(#trend)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
