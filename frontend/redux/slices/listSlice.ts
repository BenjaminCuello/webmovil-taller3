import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardRecord, ListState } from "@/types/dashboard";

const initialState: ListState = {
  records: [],
  status: "idle",
  error: null
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<DashboardRecord[]>) => {
      state.records = action.payload;
      state.status = "ready";
      state.error = null;
    },
    setStatus: (state, action: PayloadAction<ListState["status"]>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.status = "idle";
    },
    upsertRecord: (state, action: PayloadAction<DashboardRecord>) => {
      const index = state.records.findIndex(record => record.id === action.payload.id);
      if (index >= 0) {
        state.records[index] = action.payload;
        return;
      }
      state.records.unshift(action.payload);
    }
  }
});

export const { setRecords, setStatus, setError, upsertRecord } = listSlice.actions;

export default listSlice.reducer;

