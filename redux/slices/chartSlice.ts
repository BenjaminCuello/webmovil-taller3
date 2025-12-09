import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { buildChartState } from "@/lib/services/dashboardService";
import { ChartState, DashboardRecord } from "@/types/dashboard";

const initialState: ChartState = {
  trend: [],
  categoryDistribution: [],
  statusDistribution: [],
  performanceRadar: [],
  velocity: [],
  totals: { count: 0, active: 0, revenue: 0 }
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    setChartState: (state, action: PayloadAction<ChartState>) => action.payload,
    hydrateCharts: (_state, action: PayloadAction<DashboardRecord[]>) => buildChartState(action.payload)
  }
});

export const { setChartState, hydrateCharts } = chartSlice.actions;

export default chartSlice.reducer;
