"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Cookies from "js-cookie"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import  {useRouter} from "next/navigation"
import Link from "next/link"
 
const formSchema = z.object({
  email: z.string().email().min(3, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
})

 
export default function ProfileForm() {
  const router = useRouter()
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
          console.log('this is before getting response', values)
          const response = await axios.post("/api/sign-in", values);
          console.log('this is before after response', values)
          // toast.success('Successfully Signed Up!')
          Cookies.set("protalId", response.data.user._id)
          console.log('On Client Site Data', response.data.user.isAdmin)
          console.log('On Client Site Data', typeof(response.data.user.isAdmin))
          if(response.data.user.isAdmin === 'true'){
            router.push('/admin')
          }else{
            router.push('/investor')
          }
  }catch (error : any) {
      console.log('Signup Error message : ' , error.message)
      // setUser({email : "", username: "", password : ""})
      // toast.error("Really Sorry: Information is Missing")
  }finally{
      // setLoading(false)
  }
    console.log(values)
  }
  return (
    <Form {...form} >
      <div className="flex w-full justify-center items-center h-screen">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
        <Button type="submit" className="bg-blue-800">Submit</Button>
        <Link href={"/createAccount"} className="bg-black text-white flex justify-center items-center rounded-md px-3">Create Account</Link>

        </div>
      </form>
      </div>
    </Form>
  )
}