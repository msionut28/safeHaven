import React from 'react'
import Link from "next/link"
import styles from './Navbar.module.css'

export default function Navbar() {
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
      </div>
    </nav>
  )
}