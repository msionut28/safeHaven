'use client'

import { useState } from "react"
// import { useRouter } from "next/router"
// import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/router"
import Router from "next/router"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function RegisterUser() {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [passwordConfirm, setPasswordConfirm] = useState(undefined)
  const [spacebar, setSpacebar] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [accountCreated, setAccountCreated] = useState(false)
  const backend = process.env.BACKEND_URL


  function preventSpaceBar(e) {
    if(e.key === " "){
      e.preventDefault()
      setSpacebar(true)
      console.log('spacebar pressed');
    }else setSpacebar(false)
  }

  function handleInputChange(e, setter){
    const newInput = e.target.value
    password !== passwordConfirm ? setPasswordsMatch(false) : setPasswordsMatch(true)
    setter(newInput)
  }

  async function accountCreate () {
    try {
      if(username && password && passwordConfirm && passwordConfirm === password){
        const response = await fetch(`${backend}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password 
          })
        })
        
        if(response.ok) {
          console.log('ACCOUNT CREATED');
          setAccountCreated(true)
          // const router = useRouter()
          // router.push('/')
        } else {
          console.error('FAILED TO CREATE ACCOUNT')
        }
      }
    } catch(error) {
      console.error(`ERROR CREATING ACCOUNT: ${error}`)
    }
  }
  // console.log(session);
  useEffect(() => {
    const Router = useRouter()
    if (typeof window !== "undefined"){
      if (accountCreated) Router.replace("/events")
    }
  }, [accountCreated])
  // if (status === 'unauthenticated')
  return (
  <div className="py-50">
    <div className="flex items-center justify-center">
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2x1">
          Create an Account
        </CardTitle>
        <CardDescription>
          Please fill in the fields below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="aboslute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="username">Username</Label>
          <Input 
          id="username" 
          type="text" 
          placeholder="Enter your username"
          value={username}
          onChange={(e) => handleInputChange(e, setUsername)}
          onKeyDown={(e) => preventSpaceBar(e)}/>
          {spacebar ? (
            <Label>SPACES NOT ALLOWED</Label>
          ) : (<></>)}
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="password">Password</Label>
          <Input 
          id="password" 
          type="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}/>
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="passwordconfirm">Confirm your password</Label>
          <Input 
          id="passwordconfirm" 
          type="password" 
          placeholder="Confirm your password"
          value={passwordConfirm}
          onChange={(e) => handleInputChange(e, setPasswordConfirm)}/>
        </div>
        {passwordsMatch ? <></> : (
          <Label>PASSWORDS DO NOT MATCH. PLEASE TRY AGAIN!</Label>
        )}
        <Button className="w-full mt-3" type="submit" onClick={accountCreate}>CREATE ACCOUNT</Button>
        </CardContent>
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Alternatively, you can register with
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4"/>
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4"/>
            Google
          </Button>
        </div>
      </CardFooter>*/}
    </Card>
    </div>
  </div>
  )
}
