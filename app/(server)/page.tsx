import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center md:py-16 py-32 gap-6 md:px-0 px-3">
      <h1 className="md:text-6xl text-4xl font-black md:mb-10 mb-5 md:text-left text-center">
        No recipe ideas ?
      </h1>
      <p className="md:text-lg/7 max-w-xl text-center text-neutral-600">
        Let AI helps you find the best meal for you, add the ingredient that you
        have and let the magic happens.
      </p>
      <Link
        href={"/create-meal"}
        className="btn-gradient text-white px-8 py-4 text-xl rounded-full font-bold tracking-wide uppercase"
      >
        Start now
      </Link>
    </main>
  );
}
