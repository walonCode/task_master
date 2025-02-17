import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "The user's dashboard page",
};

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <main className="pt-16 bg-gray-50">
            {children}
          </main>
        </body>
      </html>
    );
}