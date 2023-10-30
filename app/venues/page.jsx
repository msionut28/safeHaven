"use client"
import React from 'react';
import Link from 'next/link';


export default function Venues() {
  return (
    <>
      <h1>venues</h1>
      <Link href="/venues/details">Find out more about this venue</Link>
      <Link href="/venues/reviews">Review A Venue</Link>
      </>
  );
}
