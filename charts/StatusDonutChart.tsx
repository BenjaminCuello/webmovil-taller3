"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { StatusSlice } from "@/types/dashboard";

interface StatusDonutChartProps {
  data: StatusSlice[];
}

const STATUS_COLORS: Record<string, string> = {
  activo: "#22d3ee",
  pendiente: "#fbbf24",
  resuelto: "#34d399"
};

export default function StatusDonutChart({ data }: StatusDonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (!total) {
    return <p className="text-xs text-slate-500">Sin registros para mostrar.</p>;
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Tooltip formatter={value => `${value} casos`} />
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={2}
          >
            {data.map(entry => (
              <Cell key={entry.label} fill={STATUS_COLORS[entry.label]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-xs uppercase text-slate-400">Total {total} casos</p>
    </div>
  );
}
