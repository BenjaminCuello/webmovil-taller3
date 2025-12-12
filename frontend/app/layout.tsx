import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import ReduxProvider from "@/redux/providers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Dashboard de Registros",
  description: "Panel interno de analisis de datos"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} text-[15px]`}>
        <ReduxProvider>
          <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}

