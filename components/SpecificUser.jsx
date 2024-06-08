'use client'
import { Button, Card, Input, List, ListItem } from "@material-tailwind/react"
import { useState } from "react"

const SpecificUser = () => {

    const [ userId, setUserId ] = useState('')
    const [ userData, setUserData ] = useState(null)

    const fetchUserData = async () => {
        const response = await fetch(`/api/users/${userId}`)

        if(response.ok) {
            const res =  await response.json()
            setUserData(res.user)
        } else {
            console.log("Error ")
            setUserData(null)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchUserData()
        }
    }
  return (
    <div>

<div className="flex">
       <div className="w-72">
        <Input label="Enter User ID" type="text" onKeyDown={handleKeyDown} value={userId} onChange={(e) => setUserId(e.target.value)}/>

       </div>
        <Button onClick={fetchUserData} className="ml-4">Fetch User</Button>

    </div>

    
    {
        userData ? (
            userData.map((d) => (
                <div key={d.id} >
                <Card className="w-96 mt-5" >
                    <List >
                   <ListItem>ID : {d.id}</ListItem>
                   <ListItem>Name : {d.name}</ListItem>
                   <ListItem>Email : {d.email}</ListItem>
                   <ListItem>Password : {d.password}</ListItem>
                    </List>
                </Card>
                </div>
            ))

        ) : (
            <p className="mt-2">
               Search for a specific user
            </p>

        )
       }
    </div>
 
  )
}

export default SpecificUser
