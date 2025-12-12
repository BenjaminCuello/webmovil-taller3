"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { PerformancePoint } from "@/types/dashboard";

interface PerformanceRadarChartProps {
  data: PerformancePoint[];
}

export default function PerformanceRadarChart({ data }: PerformanceRadarChartProps) {
  if (!data.length) {
    return <p className="text-xs text-neutral-500">No hay desempeno para graficar.</p>;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const bg = isLight ? "#ffffff" : "#020617";
  const axisText = isLight ? "#4b5563" : "#cbd5e1";
  const radarColor = isLight ? "#1d4ed8" : "#1e3a8a";

  return (
    <div className="h-48 w-full" style={{ backgroundColor: bg }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius={50} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <PolarGrid stroke={isLight ? "#e5e7eb" : "#111827"} />
          <PolarAngleAxis dataKey="label" stroke={axisText} tick={{ fontSize: 10, fill: axisText }} />
          <Tooltip
            formatter={(value: number, _name: string, payload: any) => [
              `${value}%`,
              payload && payload.payload ? String(payload.payload.label) : "Capitulo"
            ]}
            cursor={false}
            contentStyle={{
              backgroundColor: isLight ? "#ffffff" : "#020617",
              border: `1px solid ${isLight ? "#e2e8f0" : "#111827"}`,
              borderRadius: 0,
              color: isLight ? "#0f172a" : "#e5e7eb",
              fontSize: 12
            }}
          />
          <Radar name="Completion" dataKey="completion" stroke={radarColor} fill={radarColor} fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

