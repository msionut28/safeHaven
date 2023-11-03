'use client'

// import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from "next/link"
import LoginForm from './LoginForm/LoginForm'
import styles from './Navbar.module.css'
import UserProfile from './UserProfile/UserProfile'


export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('TESTING ')
  const router = useRouter()
  const { data: session } = useSession();
  // console.log( session);

  function gotoEvents() {
    router.push('/events')
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/"><h1 className={styles.logo}>SafeHaven</h1></Link>
      <div className={styles.links}>
        <Link href="/about-us">About Us</Link>
        <Link href="/MainChat"> Chats</Link>
        <Link href="/events">Events</Link>
        <Link href="/map">Map</Link>
        <Link href="/toilets">Toilets</Link>
        <Link href="/news">News</Link>
        {/* <AuthButton onClick={gotoEvents} /> */}
        {
          session ? <UserProfile user={session.user}/> : <></>
        }
        {loggedIn ? userName : <LoginForm /> }
      </div>
    </nav>
  )
}