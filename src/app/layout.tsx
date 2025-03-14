import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import NavbarWrapper from "@/components/AuthWrapper";
import { TaskProvider } from "@/libs/context/taskContext";
import { ProjectProvider } from "@/libs/context/projectContext";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Master",
  description: "A good app to manage daily,weekly,monthly tasks and routine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="pt-16 bg-gray-50"> 
          <KindeProvider>
          <TaskProvider>
              <ProjectProvider> 
                <NavbarWrapper />
                  {children}
                <Footer />
              </ProjectProvider>
            </TaskProvider>
          </KindeProvider>
        </main> 
      </body>
    </html>
  );
}
