import { cookies } from "next/headers";
import "./globals.css";
import { QueryProvider } from "@/provider/query-provider";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().then((cookies) => cookies.get("token")?.value);
  if (!token) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
