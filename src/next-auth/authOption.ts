import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions : NextAuthOptions={
    providers:[
        Credentials({

            name:'My Login' ,


            credentials :{
            email:{label:'Email' , type:'email' , placeholder:'enter your Email'} ,
            password:{label:'Password' , type:'password' , placeholder:'enter your password'}
            }  ,


        async  authorize(credentials){

            //call api   , navigate home login success , error =>  error page
    const response= await  fetch(`${process.env.API}auth/signin` , {
      method:'POST' ,
      body:JSON.stringify({
        email:credentials?.email ,
        password:credentials?.password
      }) ,
      headers:{
            'Content-Type': 'application/json',

      }
    })

    if(!response.ok){
        throw new Error(response.statusText)

    }
    const payload= await response.json()

    const userData:{id:string} = jwtDecode(payload.token)
    // user obj , token => access token
console.log('payload...' , payload);
console.log('mytoken...' , userData);


        return {
            id: userData.id , 
            email:payload.user.email ,
            name:payload.user.name ,
            token : payload.token
        }

            }
        
        })
    ] ,  
    // success login , user refresh , getSession
    callbacks:{
        // token obj  data => 
        // user obj authorize
        jwt({token , user}){
            if(user){
                  token.id=user.id
            token.token= user.token   // access token

            }
          


            console.log('token',token)


            return token

        }   ,
        
        session({session , token}){
            if(token){

                session.user.id=token.id
                

            }
            
            
            


            return session
        }


    } , 
    pages:{
        signIn :'/login'
    }

}

// login => token 
// 
// .env
//.env.local
//.env.test
// 3ev.development
//.env.production