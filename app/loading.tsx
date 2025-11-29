import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4  mt-8">
      <Image className="p-2" src="/jar-favicon.png" width={100} height={100} alt="Jam Jar" />

      <p className="font-mono">Loading..</p>
    </div>
  );
}
