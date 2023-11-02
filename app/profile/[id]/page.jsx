'use client'

import UserProfile from "../../components/UserProfile/UserProfile"
import { useSession } from 'next-auth/react'

export default function PersonalProfile() {
    const { data: session } = useSession();
  return (
    <>
    {
      session ?  <UserProfile user={session.user} /> : <p>NOT LOGGED IN</p>
}
    </>
  )
}
