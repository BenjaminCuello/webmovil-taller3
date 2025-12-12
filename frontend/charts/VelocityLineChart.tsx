"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { VelocityPoint } from "@/types/dashboard";

interface VelocityLineChartProps {
  data: VelocityPoint[];
}

export default function VelocityLineChart({ data }: VelocityLineChartProps) {
  if (!data.length) {
    return <p className="text-xs text-neutral-500">Sin actividad reciente.</p>;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const bg = isLight ? "#ffffff" : "#020617";
  const axisText = isLight ? "#4b5563" : "#cbd5e1";
  const lineColor = isLight ? "#16a34a" : "#22c55e";

  return (
    <div className="h-48 w-full" style={{ backgroundColor: bg }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -10 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: axisText, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: axisText, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Tooltip
            formatter={(value: number) => [`${value} registros`, "Velocidad"]}
            cursor={false}
            contentStyle={{
              backgroundColor: isLight ? "#ffffff" : "#020617",
              border: `1px solid ${isLight ? "#e2e8f0" : "#111827"}`,
              borderRadius: 0,
              color: isLight ? "#0f172a" : "#e5e7eb",
              fontSize: 12
            }}
          />
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

