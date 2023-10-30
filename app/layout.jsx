//styles
import './globals.css'
import { Rubik } from 'next/font/google'

//components
import Navbar from "./components/Navbar"

const rubik = Rubik({subsets: ['latin']})

export const metadata = {
  title: 'SafeHaven',
  description: ' A safe and inclusive space for LGBTQ+ people'
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
      {children}</body>
    </html>
  )
}
