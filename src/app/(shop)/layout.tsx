import "@/styles/globals.css";
import Header from "@/components/admin/header";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { fontSans } from "@/fonts";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
