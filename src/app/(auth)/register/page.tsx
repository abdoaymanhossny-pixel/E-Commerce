'use client'
import React from 'react'
import { useForm ,Controller  } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import * as zod from 'zod'
import { toast } from "@/components/ui/toast"


import {
  Field,

  FieldDescription,
  FieldError,

  FieldLabel,


  FieldTitle,
} from "@/components/ui/field"
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schema/registerSchema'
import { userRegister } from '@/api/actions/auth.actions'
import { useRouter } from 'next/navigation'



export type userData = zod.infer<typeof schema >

export default function Register() {
 const router= useRouter()
const {  control , handleSubmit}=  useForm<userData>({
 defaultValues:{
    name:'' ,
    email:'' ,
    phone:'' ,
    password:'' ,
    rePassword:'' , 
 

    
 },
 resolver:zodResolver(schema)

  })



  async function submitForm(data:userData){
    
    console.log(data)


  const isRegister= await  userRegister(data)

  console.log(isRegister);
  if(isRegister){
    // success , navigate
  toast.add({
            type: "success",
            description: "success Register",
          }) 

          router.push('/login')
  }
  else{

      toast.add({
            type: "error",
            description: "Cannot  Register Now ...",
          }) 

  }
  

  }

  return  <>
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="lg:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Join us today and start shopping!</p>
            </div>

           
            <div className="space-y-3 mb-8">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                    <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-purple-600">Continue with Google</span>
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group">
                <div className="bg-white p-1.5 rounded-lg shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 32 32">
                    <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-purple-600">Continue with GitHub</span>
              </button>
            </div>

            
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter User Name "
                      autoComplete="on"
                      className="mt-1 block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Email Address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Email"
                      autoComplete="on"
                      className="mt-1 block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Phone"
                      autoComplete="on"
                      className="mt-1 block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Password</FieldLabel>
                    <Input
                      type='password'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Password"
                      autoComplete="on"
                      className="mt-1 block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Confirm Password</FieldLabel>
                    <Input
                      type='password'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Repassword"
                      autoComplete="on"
                      className="mt-1 block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Button type='submit' className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'>
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-purple-600 hover:text-purple-700">Sign in</a>
            </p>
          </div>
        </div>

       
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-12 items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
          <div className="relative z-10 text-center text-white">
            <div className="w-full h-64 bg-contain bg-center bg-no-repeat mb-8" style={{backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'}}>
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
            <p className="text-lg text-purple-100">Start your shopping journey with us today!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>



}
  



