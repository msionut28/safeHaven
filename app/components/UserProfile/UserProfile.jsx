import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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



export default function UserProfile({user}) {
    const backendURL=process.env.BACKEND_URL
    const [editMode, setEditMode] = useState(false)
    const [username, setUsername] = useState('')
    const [about, setAbout] = useState('')
    const [avatar, setAvatar] = useState('')
    const [data, setData] = useState({})
    let reviewsLength = 0

    function handleSubmit(){
        setEditMode(false)
    }

    function startEdit(){
        setEditMode(true)
    }

    function deleteAccount(){
        console.log('DELETED');
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString)
        return date.toDateString()
    }
    function handleInputChange(e, setter){
        const newInput = e.target.value 
        console.log(newInput)
        setter(newInput)
    }
    async function getData(){
        console.log('user profile', user);
        if(user.id){
            const id = user.id
            const response = await fetch(`${backendURL}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if (response.ok){
                const userInfo = await response.json()
                setData(userInfo)
                reviewsLength = data.reviews.length
            } else{
                console.error(error)
            }
            console.log(data);
        } else console.log(user);
    }
  return (
    // <div>
    //     <h1>Welcome back, {user.username}!</h1>
    //     <p>You have been a member since: {user.memberSince}</p>
    //     <p>Your User ID is: {user.id} </p>
    // </div>
<Sheet> 
    <SheetTrigger asChild> 
        <Button variant="outline" onClick={getData}>PROFILE</Button> 
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
            {
                editMode ?
                <SheetTitle>EDITING MODE</SheetTitle>
                :<SheetTitle>Welcome back, {data.username} </SheetTitle>
            }
            <SheetDescription>
                {editMode ? 
                <p>Start editing your profile!</p>  
                :<p>Information about your profile</p> }
            </SheetDescription>
        </SheetHeader>
        <Label className="mt-10">
            You have been a member since: {formatDate(data.memberSince)}
        </Label>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Username
                </Label>
                {
                    editMode 
                        ?<Input 
                        id="name"
                        className="col-span-3" 
                        placeholder="Insert your username..." 
                        onChange={(e) => handleInputChange(e, setUsername)}/> 
                        :<Input 
                        className="col-span-3"
                        value={data.username}
                        disabled={true}/>
                }
                <Label htmlFor="about-you" className="text-right">
                    About You
                </Label>
                {
                    editMode 
                        ?<Input 
                        id="about-you"
                        className="col-span-3" 
                        placeholder="Tell your story..." 
                        onChange={(e) => handleInputChange(e, setAbout)}/> 
                        :<Input 
                        className="col-span-3"
                        value={data.aboutYourself}
                        disabled={true}/>
                }
                <Label htmlFor="about-you" className="text-right">
                    Avatar
                </Label>
                {
                    editMode 
                        ?<Input 
                        id="profilePic"
                        className="col-span-3" 
                        placeholder="Paste in the link to your new avatar.." 
                        onChange={(e) => handleInputChange(e, setAvatar)}
                        disabled={!editMode}/> 
                        :<Input 
                        className="col-span-3"
                        value={data.aboutYourself}
                        disabled={true}/>
                }
            </div>
            {/* {
               data.reviews.length?
                <div>
                    <Label>Thanks for contributing to our community. You currently have:</Label>
                    <ul>
                        <li>REVIEWS: {reviewsLength}</li>
                        <li>MARKERS: TBE</li>
                    </ul>
                </div>
                :<></>
            } */}
            <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-3 flex">
                </div>
            </div>
        </div>
    <SheetFooter>
        { editMode
            ?<Button className="m-auto" onClick={handleSubmit}>SAVE YOUR CHANGES</Button>
            :<Button className="m-auto"onClick={startEdit}>EDIT YOUR PROFILE!</Button>
        }
        <Button className="m-auto" onClick={deleteAccount}>DELETE ACCOUNT</Button>
    </SheetFooter>
    </SheetContent>
</Sheet>
  )
}