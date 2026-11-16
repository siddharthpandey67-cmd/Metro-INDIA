import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "METRO INDIA | Explore India's Metro Network",
  description: "Explore metro networks, stations, routes, upcoming projects and official ticket booking information across India."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
