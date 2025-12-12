import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRange, FiltersState, RecordCategory, RecordStatus, SortBy } from "@/types/dashboard";

const buildInitialState = (): FiltersState => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  return {
    dateRange: { from: thirtyDaysAgo.toISOString(), to: now.toISOString() },
    category: "todas",
    status: "todos",
    sortBy: "createdAt",
    sortDirection: "desc",
    search: ""
  };
};

const initialState: FiltersState = buildInitialState();

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setCategory: (state, action: PayloadAction<RecordCategory | "todas">) => {
      state.category = action.payload;
    },
    setStatus: (state, action: PayloadAction<RecordStatus | "todos">) => {
      state.status = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortDirection = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetFilters: () => buildInitialState()
  }
});

export const { setDateRange, setCategory, setStatus, setSortBy, setSortDirection, setSearch, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
