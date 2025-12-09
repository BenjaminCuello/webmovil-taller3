"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { VelocityPoint } from "@/types/dashboard";

interface VelocityLineChartProps {
  data: VelocityPoint[];
}

export default function VelocityLineChart({ data }: VelocityLineChartProps) {
  if (!data.length) {
    return <p className="text-xs text-slate-500">Sin actividad reciente.</p>;
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: -10 }}>
          <XAxis dataKey="label" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} stroke="#475569" fontSize={12} tickLine={false} axisLine={false} width={30} />
          <Tooltip formatter={value => `${value} registros`} />
          <Line type="monotone" dataKey="value" stroke="#fbbf24" strokeWidth={2} dot={{ stroke: "#fbbf24", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
