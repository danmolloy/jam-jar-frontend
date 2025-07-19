'use client'
import { Form, Formik } from "formik"
import InputField from "../form/inputField"
import ButtonPrimary from "../form/buttonPrimary"
import * as Yup from "yup";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UpdatePassword from "./updatePassword";
import UpdateDailyTarget from "./updateDailyTarget";
import { components } from "@/types/api";
import UpdateUsername from "./updateUsername";
import UpdateEmail from "./updateEmail";
import DeleteAccount from "./deleteAccount";

type UserData = components["schemas"]["User"]

export default function SettingsIndex({user}: {
    user: UserData
}) {


  return (
    <div>
      <UpdateDailyTarget dailyTarget={user.daily_target}/>
      <UpdateEmail email={user.email} />
      <UpdateUsername username={user.username} />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  )
}