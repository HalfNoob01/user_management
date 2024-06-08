'use client'

import { Button, Input } from "@material-tailwind/react"
import { useState } from "react"

const CreateUser = () => {
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

    const handleSubmit =  async (e) => {
        e.preventDefault()

        if(!id || !name || !email || !password) {
            alert('Please fill all the input fields')
            return
        } 

        try {
            const response = await fetch('/api/users', {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json',

                },
                body : JSON.stringify({id, name , email, password})
            })

            if(response.ok) {
                alert('User successfully created')
            }else {
                alert("Something went wrong !")
                return
            }
        }catch(error) {
            alert(error)
            return
        }
    }
    return (
      <div>
   
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input label="ID" name="id" type="text" placeholder="ID" value={formData.id} onChange={handleChange}/>
                <Input label="NAME" name="name" type="text" placeholder="NAME" value={formData.name} onChange={handleChange}/>
                <Input label="EMAIL" name="email" type="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} />
                <Input label="PASSWORD" name="password" type="password" placeholder="PASSWORD" value={formData.password} onChange={handleChange}/>

                <Button className="mt-2" type="submit">Submit</Button>
            </form>
      
      </div>
    )
}

export default CreateUser;