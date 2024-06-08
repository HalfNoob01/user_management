import { users } from "@/app/utils/db";
import { NextResponse } from "next/server"
import fs from "fs"

export async function GET(_, res) {
    const { id }  = await res.params;
    const user = users.filter((u) => u.id === id)
    return NextResponse.json({user})
}

export async function POST(req,res){
    let { name, email, password } = await req.json()
    const { id } = await res.params
 
    const { name: uName, email:uEmail, password : uPassword} = users.find((u) =>u.id===id)

    if (uName === name && uEmail === email && uPassword === password) {
         return NextResponse.json({result : "Successfully logged in"})
    }else if (!name || !email || !password) {
        return NextResponse.json({result : "Please fill all the input fileds"})
    }else{
        console.log(uName,uEmail,uPassword,name,email,password)
        return NextResponse.json({result : "Invalid Credentials"})
    }
}

export async function DELETE(req,res) {
    const { id } = res.params;
    console.log(res)
    const useIndex =  users.findIndex((user)=> user.id === id)

    if(useIndex === -1) {
        return NextResponse.json({result : "user not found"}, { status : 404 })
    }

    users.splice(useIndex,1)

     
    const updateUsersArray = users

    const updatedData =  JSON.stringify(updateUsersArray, null, 2)
     
    fs.writeFileSync('./app/utils/db.js', `export const users = ${updatedData}`, "utf-8")

    return NextResponse.json({success : "User Sucessfully Deleted"})
}