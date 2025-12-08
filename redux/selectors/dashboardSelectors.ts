import { createSelector } from "@reduxjs/toolkit";
import { applyFilters } from "@/lib/services/dashboardService";
import { RootState } from "@/redux/store";

export const selectFilters = (state: RootState) => state.filters;
export const selectRecords = (state: RootState) => state.list.records;
export const selectCharts = (state: RootState) => state.charts;

export const selectFilteredRecords = createSelector([selectRecords, selectFilters], (records, filters) =>
  applyFilters(records, filters)
);

export const selectListStatus = (state: RootState) => state.list.status;
export const selectListError = (state: RootState) => state.list.error;
