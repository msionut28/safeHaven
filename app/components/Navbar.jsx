'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import LoginForm from './LoginForm/LoginForm';
import UserProfile from './UserProfile/UserProfile';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('TESTING');
  const { data: session } = useSession();

  return (
    <nav className="bg-tomato p-5 flex justify-between items-center shadow-md">
      <Link href="/"><h1 className="text-white cursor-pointer">SafeHaven</h1></Link>
      <div className="flex gap-5">
        <Link href="/about-us" className="text-white">About Us</Link>
        <Link href="/MainChat" className="text-white">Chats</Link>
        <Link href="/events" className="text-white">Events</Link>
        <Link href="/map" className="text-white">Map</Link>
        <Link href="/toilets" className="text-white">Toilets</Link>
        <Link href="/news" className="text-white">News</Link>
        {session ? <UserProfile user={session.user} /> : null}
        {loggedIn ? userName : <LoginForm />}
      </div>
    </nav>
  );
}
