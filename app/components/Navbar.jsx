'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from "next/link"
import styles from './Navbar.module.css'
import LoginForm from './LoginForm/LoginForm'
import { Button } from '@/components/ui/button'

function AuthButton (){
  const { data: session } = useSession();
  
  if(session) {
    return (
      <Button variant="outline">PROFILE</Button>
    );
  }
}
export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('TESTING ')
  return (
    <nav className={styles.navbar}>
      <Link href="/about-us"><h1 className={styles.logo}>SafeHaven</h1></Link>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/MainChat">Community Chats</Link>
        <Link href="/events">Events</Link>
        <Link href="/map">Map</Link>
        <Link href="/venues">What's on?</Link>
        <Link href="/remembering-ezzy">Rememberance</Link>
        <AuthButton />
        {loggedIn ? userName : <LoginForm /> }
      </div>
    </nav>
  )
}