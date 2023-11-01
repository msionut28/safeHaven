'use client'
import React from 'react'
import Link from "next/link"
import styles from './Navbar.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

function AuthButton (){
  const { data: session } = useSession();
  
  if(session) {
    return (
      <>
      {session?.user?.name} <br />
      <button onClick={()=> signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
  Not signed in <br />
  <button onClick={()=> signIn()}>Sign In</button>
  </>
)
}
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/"><h1 className={styles.logo}>SafeHaven</h1></Link>
      <div className={styles.links}>
        <Link href="/about-us">About Us</Link>
        <Link href="/MainChat">Community Chats</Link>
        <Link href="/events">Events</Link>
        <Link href="/venues">What's on?</Link>
        <Link href="/toilets">Toilets</Link>
        <Link href="/news">News</Link>
        <AuthButton />
      </div>
    </nav>
  )
}