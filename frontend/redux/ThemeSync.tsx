"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";

interface ThemeSyncProps {
  children: ReactNode;
}

export default function ThemeSync({ children }: ThemeSyncProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      dispatch(setTheme(stored));
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme", mode);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, [mode]);

  return <>{children}</>;
}

