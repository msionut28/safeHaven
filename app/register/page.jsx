'use client'

import { Icons } from "@/components/ui/icons"
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

export default function WOOOS() {
  return (
    <div className="w-1/2 flex c">
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
          <Input id="username" type="text" placeholder="Enter your username"/>
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password"/>
        </div>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="passwordconfirm">Confirm your password</Label>
          <Input id="passwordconfirm" type="password" placeholder="Confirm your password"/>
        </div>
        <Button className="w-full mt-3">CREATE ACCOUNT</Button>
        <div className="relative">
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
      </CardFooter>
    </Card>
    </div>
  )
}
