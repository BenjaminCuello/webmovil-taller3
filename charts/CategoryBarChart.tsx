"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CategorySlice } from "@/types/dashboard";

interface CategoryBarChartProps {
  data: CategorySlice[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  if (!data.length) {
    return <p className="text-xs text-slate-500">Aún no hay distribución por categoría.</p>;
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#475569" fontSize={12} tickFormatter={value => formatCurrency(Number(value))} tickLine={false} axisLine={false} width={80} />
          <Tooltip cursor={{ fill: "#edf2f7" }} formatter={value => formatCurrency(Number(value))} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#4c79ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
