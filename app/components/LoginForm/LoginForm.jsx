import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn, signOut, useSession } from 'next-auth/react'
import {
    Sheet, 
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"
import { useState } from "react"
 
function AuthButton (){
  return (
    <SheetTrigger asChild> 
      <Button variant="outline">LOG IN</Button> 
    </SheetTrigger>
  );
}

export default function LoginForm() {
  const { data: session } = useSession()

  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  function handleInputChange(e, setter){
    const newInput = e.target.value
    console.log(newInput);
    // password !== passwordConfirm ? setPasswordsMatch(false) : setPasswordsMatch(true)
    setter(newInput)
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  async function handleLogin(){
    const backendUrl = process.env.BACKEND_URL
  }

  return (
    <Sheet>
          {session
          ?<Button variant="outline" onClick={()=> signOut()}>SIGN OUT</Button> : <AuthButton />
          }
        <SheetContent>
        <SheetHeader>
            <SheetTitle>LOG IN </SheetTitle>
            <SheetDescription>
                <p>Please log in so you can have access to all of our features.</p>
            </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                Username
            </Label>
            <Input 
            id="name"
            className="col-span-3" 
            placeholder="Insert your username..." 
            onChange={(e) => handleInputChange(e, setUsername)}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
                Password
            </Label>
            <div className="col-span-3 flex">
            <Input 
            type={showPassword ? 'text' : 'password'}  
            placeholder="Insert your password..." 
            onChange={(e) => handleInputChange(e, setPassword)}/>
              {showPassword ? (
                <Icons.eyeOff className="h-6 w-6 flex center mt-2 ml-2 cursor-pointer" onClick={togglePasswordVisibility}/>
              ) : (
                <Icons.eye className="h-6 w-6 flex center mt-2 ml-2 cursor-pointer" onClick={togglePasswordVisibility}/>
              )}
            </div>
            </div>
        </div>
        <SheetFooter>
            <Button type="submit" className="m-auto">LOG IN</Button>
        </SheetFooter>
        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-5">
          <Button variant="outline" onClick={()=> signIn("github", {redirect:false})}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline" onClick={()=> signIn("google", {redirect:false})}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative mt-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              You don't have an account yet?
            </span>
          </div>
        </div>
        <div className="flex center mt-5">
        <Button  className="m-auto">CREATE AN ACCOUNT</Button>
        </div>
    </SheetContent>
    </Sheet>
  )
}
