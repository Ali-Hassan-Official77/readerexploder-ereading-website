import Image from 'next/image';

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="text-center">
        <Image
          src="/logo.svg"
          alt="ReaderExpo"
          width={64}
          height={64}
          priority
          className="mx-auto size-16 animate-pulse"
        />

        <p className="mt-5 font-display text-2xl">
          Opening the shelf…
        </p>

        <div className="mx-auto mt-4 h-1 w-28 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}