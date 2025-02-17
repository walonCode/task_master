import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description: "Comming soon",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="text-center flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg md:text-xl text-gray-600">We&apos;re working on something amazing. Stay tuned!</p>
      </div>
    </div>
  );
}
