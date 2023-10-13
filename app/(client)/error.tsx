"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center py-28 gap-6 md:px-0 px-3">
      <h1 className="md:text-6xl text-4xl md:text-left text-center font-black mb-10">
        Something went wrong!
      </h1>
      <button
        onClick={() => reset()}
        className="btn-gradient text-white px-8 py-4 text-xl rounded-full font-bold tracking-wide uppercase"
      >
        Try again
      </button>
    </main>
  );
}
