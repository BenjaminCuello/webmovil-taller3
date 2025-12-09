import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Dashboard Móvil",
  description: "Dashboard responsivo con filtros persistentes"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-100 text-slate-900`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
