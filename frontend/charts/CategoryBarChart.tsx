"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { CategorySlice } from "@/types/dashboard";

interface CategoryBarChartProps {
  data: CategorySlice[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  if (!data.length) {
    return <p className="text-xs text-neutral-500">Aun no hay distribucion por categoria.</p>;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const bg = isLight ? "#ffffff" : "#020617";
  const axisText = isLight ? "#4b5563" : "#cbd5e1";
  const barColor = isLight ? "#facc15" : "#eab308";

  return (
    <div className="h-48 w-full" style={{ backgroundColor: bg }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="1 3" stroke={isLight ? "#e5e7eb" : "#111827"} />
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
            formatter={(value: number, _name: string, payload: any) => [
              formatCurrency(Number(value)),
              payload && payload.payload ? String(payload.payload.label).toUpperCase() : "Categoria"
            ]}
          />
          <Bar dataKey="value" fill={barColor} barSize={10} radius={0} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

