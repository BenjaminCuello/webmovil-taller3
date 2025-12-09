"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { PerformancePoint } from "@/types/dashboard";

interface PerformanceRadarChartProps {
  data: PerformancePoint[];
}

export default function PerformanceRadarChart({ data }: PerformanceRadarChartProps) {
  if (!data.length) {
    return <p className="text-xs text-slate-500">No hay desempeño para graficar.</p>;
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius={80} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="label" stroke="#475569" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value, _name, payload) => `${payload.payload.label}: ${value}%`} />
          <Radar name="Completion" dataKey="completion" stroke="#7b9eff" fill="#7b9eff" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
