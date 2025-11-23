'use client';
import { featuresArr } from '../about';

export default function About() {
  return (
    <div className="bg-white text-dark font-sans p-2 flex flex-col ">
      <h1 className="font-sans font-medium md:text-6xl text-5xl m-4 mb-8 text-center">
        Capture your practice
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap  justify-center  lg:justify-evenly">
        {featuresArr.map((i, index) => (
          <div
            key={index}
            className={`flex bg-white text-dark justify-evenly md:justify-between items-center flex-col w-[90vw] lg:w-[45vw] min-h-[50vh] border border-gray-400 hover:border-black  shadow m-4 rounded`}
          >
            <div className="relative w-full m-2 h-full   flex flex-col items-center justify-center overflow-hidden">
              {i.component}
            </div>
            <div className={`z-10  flex flex-col  w-full  mx-2  text-dark p-4   `}>
              <div className="flex items-center  gap-2">
                {/*                 <div className="text-xl text-blue-700">{i.icon}</div>
                 */}{' '}
                <h2 className="text-xl font-semibold">{i.title}</h2>
              </div>
              <p className="text-lg text-neutral-500">{i.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
