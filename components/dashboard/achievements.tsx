import { components } from '@/types/api';

export type AchievementsList = components['schemas']['User']['full_achievements'];

export default function AchievementsList({
  achievements,
}: {
  achievements: {
    id: number;
    name: string;
    description: string;
  }[];
}) {
  return (
    <div className="border-2 rounded p-4 bg-green-400">
      <h2>Achievements</h2>
      <div className="flex flex-row flex-wrap ">
        {achievements.map((a) => (
          <div className="w-36 h-36 border-2 shadow m-1 items-start justify-end p-1 " key={a.id}>
            <p className="">{a.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
