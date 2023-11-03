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
        <Link href="/about-us" className="text-black">About Us</Link>
        <Link href="/MainChat" className="text-black">Chats</Link>
        <Link href="/events" className="text-black">Events</Link>
        <Link href="/map" className="text-black">Map</Link>
        <Link href="/toilets" className="text-black">Toilets</Link>
        <Link href="/news" className="text-black">News</Link>
        {session ? <UserProfile user={session.user} /> : null}
        {loggedIn ? userName : <LoginForm />}
      </div>
    </nav>
  );
}
