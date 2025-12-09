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
    <article className="rounded-xl border border-rose-100 bg-gradient-to-br from-white via-white to-rose-50 p-4 shadow-sm">
      <p className="text-xs uppercase text-rose-500">{subtitle}</p>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 min-h-[10rem]">
        {isLoading ? <div className="h-36 animate-pulse rounded-md bg-rose-100/70" /> : children}
      </div>
    </article>
  );
}

export default function ChartGallery({ charts, isLoading }: ChartGalleryProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ChartCard title="Evolución de ingresos" subtitle="Área" isLoading={isLoading}>
        <TrendAreaChart data={charts.trend} />
      </ChartCard>
      <ChartCard title="Distribución por categoría" subtitle="Barras" isLoading={isLoading}>
        <CategoryBarChart data={charts.categoryDistribution} />
      </ChartCard>
      <ChartCard title="Estado operativo" subtitle="Torta" isLoading={isLoading}>
        <StatusDonutChart data={charts.statusDistribution} />
      </ChartCard>
      <ChartCard title="Rendimiento por capítulo" subtitle="Radar" isLoading={isLoading}>
        <PerformanceRadarChart data={charts.performanceRadar} />
      </ChartCard>
      <ChartCard title="Velocidad semanal" subtitle="Líneas" isLoading={isLoading}>
        <VelocityLineChart data={charts.velocity} />
      </ChartCard>
    </section>
  );
}
