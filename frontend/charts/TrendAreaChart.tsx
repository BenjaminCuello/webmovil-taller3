"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { TrendPoint } from "@/types/dashboard";

interface TrendAreaChartProps {
  data: TrendPoint[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function TrendAreaChart({ data }: TrendAreaChartProps) {
  if (!data.length) {
    return <div className="text-xs text-neutral-500">Sin datos suficientes</div>;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const bg = isLight ? "#ffffff" : "#020617";
  const axisText = isLight ? "#4b5563" : "#cbd5e1";
  const lineColor = isLight ? "#1d4ed8" : "#e5e7eb";

  return (
    <div className="h-48 w-full" style={{ backgroundColor: bg }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="label"
            tick={{ fill: axisText, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: axisText, fontSize: 11 }}
            tickFormatter={value => formatCurrency(Number(value))}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: isLight ? "#ffffff" : "#020617",
              border: `1px solid ${isLight ? "#e2e8f0" : "#111827"}`,
              borderRadius: 0,
              color: isLight ? "#0f172a" : "#e5e7eb",
              fontSize: 12
            }}
            formatter={(value: number) => [formatCurrency(Number(value)), "Ingresos"]}
            labelFormatter={label => label.toString()}
          />
          <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
