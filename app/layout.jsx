//styles
import '../styles/global.css'
import { Rubik } from 'next/font/google'

//components
import Navbar from "./components/Navbar"
import  SessionProvider from "./components/SessionProvider"
import {  getServerSession } from 'next-auth'

const rubik = Rubik({subsets: ['latin']})

export const metadata = {
  title: 'SafeHaven',
  description: ' A safe and inclusive space for LGBTQ+ people'
}

export default async function RootLayout({ 
  children }) {
    const session = await getServerSession();
 return (
    <html lang="en">
      <body className={rubik.className}>
          <SessionProvider session={session}>
            <main>
              <Navbar />
              {children}
            </main>
          </SessionProvider>
      </body>
    </html>
  )
}
