import { DateTime } from 'luxon';

export default function DiaryComponent() {
  return (
    <div className="bg-white text-xs p-4 m-4 w-54  rounded shadow flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="text-sm underline">New Entry</p>
        <p className="">{DateTime.now().toFormat('dd LLL')}</p>
      </div>
      <p className="text-xs  h-54 py-1">
        Today&apos;s practice focused on letting go of perfection and just perform. I concentrated
        on breathing deeply before each run through, visualising the audition space and playing
        through everything without stopping (regardless of mistakes). It was effective practice for
        the audition, and this is something I&apos;m going to practice every day this week.
      </p>
      <div className="text-white text-sm bg-blue-400 w-10 rounded text-center self-end cursor-pointer">
        Save
      </div>
    </div>
  );
}
