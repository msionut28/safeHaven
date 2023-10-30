'use client'

import { useState } from "react";


import AuthPage from "./AuthPage/page.jsx";
import ChatsPage from "./ChatsPage/page.jsx";

export default function MainChat() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

