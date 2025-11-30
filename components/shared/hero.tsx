
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="h-screen w-screen bg-blue-400 text-dark flex flex-col items-center pt-[20vh] sm:pt-[30vh] -mt-12">
      <h1 className="text-6xl lg:text-8xl font-display flex flex-col text-center">
        Jam Jar <span className="text-lg font-display">Practice diary for musicians</span>
      </h1>
      <div className="flex lg:flex-row flex-col items-center justify-center  w-1/2 lg:w-1/3">
        <Image className="p-2" src="/jar-favicon.png" width={150} height={150} alt="Jam Jar" />
        <div className="  flex flex-col items-center justify-center">
          <p className="font-bold my-2 lg:my-0 text-center ">
            Jam Jar helps musicians stay consistent with structured practice tracking, recordings
            and insights.
          </p>

          <div className="flex flex-row mt-2">
            <Link
              href={'/register'}
              className="bg-yellow-400 text-black border-dark border text-center rounded flex flex-row items-center justify-center font-bold  w-32 py-1 px-2  mx-2  hover:underline"
            >
              <p>Start for free</p>
              {/* <IoIosArrowRoundForward size={20}/> */}
            </Link>
            <a
              href={'/#about'}
              className="border-dark  text-text-black  text-center rounded flex flex-row items-center justify-center font-bold border w-32 py-1 px-2  mx-2  hover:underline"
            >
              <p>Learn more</p>
              {/* <IoIosArrowRoundForward size={20}/> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
