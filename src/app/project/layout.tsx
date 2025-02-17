import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project",
    description: "The user's project page",
};

export default function ProjectLayout({
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