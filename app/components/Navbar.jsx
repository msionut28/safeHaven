import React from 'react'
import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
    <Link href="/about-us"><h1>SafeHaven</h1></Link>
    <Link href="/">Home</Link>
    <Link href="/chat">Community Chats</Link>
    <Link href="/events">Events</Link>
    <Link href="/map">Map</Link>
    <Link href="/venues">What's on?</Link>
  </nav>
  )
}
