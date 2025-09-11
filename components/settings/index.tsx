'use client'
import UpdateDailyTarget from "./updateDailyTarget";
import { components } from "@/types/api";
import UpdateUsername from "./updateUsername";
import UpdateEmail from "./updateEmail";
import DeleteAccount from "./deleteAccount";
import ManageSubscription from "./manageSubscription";
import Link from "next/link";

type UserData = components["schemas"]["User"]

export default function SettingsIndex({user}: {
    user: UserData
}) {


  return (
    <div>
      <UpdateDailyTarget dailyTarget={user.daily_target}/>
      <UpdateEmail email={user.email} />
      <UpdateUsername username={user.username} />
                <div className="flex flex-col p-4 items-start  justify-between lg:flex-row border-b border-neutral-300">
<h2 className="mx-2 font-medium text-lg">Reset Password</h2>

      <Link href={"/settings/update-password/"} className="rounded p-1 m-2 px-2 mt-4 text-white hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-sm">Reset Password</Link>
                </div>
      <ManageSubscription />
      <DeleteAccount />
    </div>
  )
}