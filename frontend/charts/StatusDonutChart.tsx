"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { StatusSlice } from "@/types/dashboard";

interface StatusDonutChartProps {
  data: StatusSlice[];
}

const STATUS_COLORS: Record<string, string> = {
  activo: "#0f766e",
  pendiente: "#c9b458",
  resuelto: "#1e3a8a"
};

export default function StatusDonutChart({ data }: StatusDonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  if (!total) {
    return <p className="text-xs text-neutral-500">Sin registros para mostrar.</p>;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const bg = isLight ? "#ffffff" : "#020617";

  return (
    <div className="h-48 w-full" style={{ backgroundColor: bg }}>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) return null;

              const item = payload[0] as any;
              const label = String(item.name ?? item.payload?.label ?? "");
              const value = Number(item.value ?? item.payload?.value ?? 0);

              return (
                <div
                  style={{
                    backgroundColor: isLight ? "#ffffff" : "#020617",
                    border: `1px solid ${isLight ? "#e2e8f0" : "#111827"}`,
                    borderRadius: 0,
                    padding: "6px 8px",
                    color: isLight ? "#0f172a" : "#e5e7eb",
                    fontSize: 12
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{label}</div>
                  <div>{value} casos</div>
                </div>
              );
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={28}
            outerRadius={40}
            paddingAngle={1}
          >
            {data.map(entry => (
              <Cell key={entry.label} fill={STATUS_COLORS[entry.label]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-1 text-center text-[10px] uppercase text-neutral-500">Total {total} casos</p>
    </div>
  );
}

