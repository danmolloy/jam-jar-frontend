'use client';
import { components } from '@/types/api';
import { Session } from 'next-auth';
import Link from 'next/link';

type Goal = components['schemas']['Goal'];

export default function GoalDetail({ goal, session }: { goal: Goal; session: Session }) {
  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this goal?');
    if (!confirmed) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/goals/${goal.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (res.ok) {
      console.log('Deleted successfully');
      window.location.href = '/sessions'; // or use router.push
    } else {
      console.error('Failed to delete');
    }
  };

  return (
    <div>
      {JSON.stringify(goal)}
      <Link href={`/goals/${goal.id}/update`}>Update</Link>
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
