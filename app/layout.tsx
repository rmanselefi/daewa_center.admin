import "./globals.css";
import { QueryProvider } from "@/provider/query-provider";
import { Providers } from "@/provider/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
