import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Task",
    description: "The user's task page",
};

export default function TaskLayout({
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