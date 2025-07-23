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
      <Link href={"/settings/update-password/"}>Update Password</Link>
      <ManageSubscription />
      <DeleteAccount />
    </div>
  )
}