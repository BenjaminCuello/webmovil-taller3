import { store } from "@/redux/store";
import { setCategory } from "@/redux/slices/filterSlice";

store.dispatch(setCategory("marketing"));
console.log(store.getState().filters);

