'use server'
import { loginData } from "@/app/(auth)/login/page";
import { userData } from "@/app/(auth)/register/page";
import {cookies} from 'next/headers'
export async function userRegister(data:userData){
    try {

    const response= await  fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup` , {
      method:'POST' ,
      body:JSON.stringify(data) ,
      headers:{
            'Content-Type': 'application/json',

      }
    })

    const payload= await response.json()
console.log('payload' , payload);
return response.ok
  
} catch (error) {

  console.log(error);
  
  
}
}

