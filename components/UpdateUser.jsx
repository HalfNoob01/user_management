'use client'

import { Button, Input } from "@material-tailwind/react"
import { useState } from "react"

const UpdateUser = () => {

    const [ formData, setFormData ] = useState({
        id : "" , name : "", email : "", password : ""
    })
   
    const { id, name, email, password } = formData
    
    const handleChange = (e) => {
        setFormData((old)=>(
            {
                ...old,
                [e.target.name] : e.target.value
            }
        )
            
        )
    }

    const  handleSubmit = async (e) => {
        e.preventDefault()

        if(!id) {
            alert('Please provide user ID ')
        }

        const requestedData = {id } 

        if (name) {
          requestedData.name = name
        }
        if (email) {
          requestedData.email = email
        }
        if (password) {
          requestedData.password = password
        }
        
        try {
             const response = await fetch('/api/users',{
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(requestedData)
             })

             if(response.ok) {
                alert('user updated successfully')
                clearForm()
             }else {
               const data = await response.json()
               alert(data.result || 'Something went wrong ')
             }
        } catch (error) {
            alert(error)

        }
    }

    const clearForm = () => {
        setFormData ({
            id : "",
            name : "",
            email : "",
            password : ""

        })
    }
  return (
    <div>
       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input label="ID" name="id" type="text" placeholder="ID" value={formData.id} onChange={handleChange}/>
                <Input label="NAME" name="name" type="text" placeholder="NAME" value={formData.name} onChange={handleChange}/>
                <Input label="EMAIL" name="email" type="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} />
                <Input label="PASSWORD" name="password" type="password" placeholder="PASSWORD" value={formData.password} onChange={handleChange}/>

                <Button className="mt-2" type="submit">Update User</Button>
            </form>
    </div>
  )
}

export default UpdateUser
