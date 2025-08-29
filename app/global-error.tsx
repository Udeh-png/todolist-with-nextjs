"use client"; // Error boundaries must be Client Components

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="border h-screen flex items-center flex-col justify-center gap-4">
        <h2 className="text-3xl text-red-600">Something went wrong !</h2>
        <button
          onClick={() => reset()}
          className="px-3 py-[1.5px] text-lg rounded-2xl bg-black text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
