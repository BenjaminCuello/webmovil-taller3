"use client";

import { ReactNode } from "react";
import TrendAreaChart from "@/charts/TrendAreaChart";
import CategoryBarChart from "@/charts/CategoryBarChart";
import StatusDonutChart from "@/charts/StatusDonutChart";
import PerformanceRadarChart from "@/charts/PerformanceRadarChart";
import VelocityLineChart from "@/charts/VelocityLineChart";
import { ChartState } from "@/types/dashboard";

interface ChartGalleryProps {
  charts: ChartState;
  isLoading: boolean;
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  isLoading: boolean;
  children: ReactNode;
}

function ChartCard({ title, subtitle, isLoading, children }: ChartCardProps) {
  return (
    <article
      className="px-3 py-3 overflow-hidden border rounded-none"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
    >
      <div className="mb-3">
        <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">{subtitle}</p>
        <h3 className="mt-1 text-xs font-semibold leading-snug break-words">{title}</h3>
      </div>
      <div className="min-h-[13rem]">
        {isLoading ? (
          <div
            className="h-44"
            style={{ backgroundColor: "var(--bg)" }}
          />
        ) : (
          children
        )}
      </div>
    </article>
  );
}

export default function ChartGallery({ charts, isLoading }: ChartGalleryProps) {
  return (
    <section
      className="border rounded-none px-4 py-3"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
        color: "var(--text)"
      }}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-2">
        <ChartCard title="Evolucion de ingresos" subtitle="Tendencia" isLoading={isLoading}>
          <TrendAreaChart data={charts.trend} />
        </ChartCard>
        <ChartCard title="Distribucion por categoria" subtitle="Distribucion" isLoading={isLoading}>
          <CategoryBarChart data={charts.categoryDistribution} />
        </ChartCard>
        <ChartCard title="Estado operativo" subtitle="Estados" isLoading={isLoading}>
          <StatusDonutChart data={charts.statusDistribution} />
        </ChartCard>
        <ChartCard title="Desempeno por capitulo" subtitle="Rendimiento" isLoading={isLoading}>
          <PerformanceRadarChart data={charts.performanceRadar} />
        </ChartCard>
        <ChartCard title="Velocidad semanal" subtitle="Actividad" isLoading={isLoading}>
          <VelocityLineChart data={charts.velocity} />
        </ChartCard>
      </div>
    </section>
  );
}

