"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
import { useState } from "react"
import Link from "next/link"
// import sendEmail from "@/lib/sendEmail"
 
const formSchema = z.object({
  email: z.string().email().min(3, {
    message: "email must be at least 2 characters.",
  }),
  firstName : z.string().min(3,{
    message : "firstName must has 3 characters"
  }),
  lastName : z.string().min(3,{
    message : "last must has 3 characters"
  }),
  securekey : z.string().min(4,{
    message : "Invalid Secure Key"
  }),
  type: z.enum(["admin", "investor"], {
    required_error: "You need to select one of them",
  }), 
  password: z.string().min(4,{
    message : "At Least enter 4 Characters of password"
  }),
  confirmPassword: z.string(),
})
.refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);
 
export default function ProfileForm() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email : "",
      firstName: "",
      lastName:"",
      password: "",
      securekey : "",
      type : undefined,
      confirmPassword : ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        // verify the secure key before proceed
        console.log(process.env.SECURE_KEY)
        if(values.securekey == "03077046908"){
          console.log("enetered in the function")
               const response = await axios.post("/api/createaccount", values);
          console.log('On Client Site Data', response.data.message)
          setMessage(response.data.message)
        if(response.data.success){
          console.log(response, "response on sign-up")
          
        }   
        return
        }else{
            setMessage("Invalid Secure Key")
        }
       
          
      console.log(values)
      //
      // router.push('/log-in')
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
    <Form {...form}  >
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
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
        <div className="flex gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormField
          control={form.control}
          name="securekey"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>Secure Key</FormLabel>
              <FormControl>
                <Input placeholder="secureKey" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field } : any) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
        <Button type="submit" className="bg-blue-800">Submit</Button>
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="self-center flex flex-col ">
                <div className="flex items-center gap-3">
              <FormLabel>Role:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row items-center "
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="investor" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Investor
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="admin" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      admin
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href={"/sign-in"} className="bg-black text-white flex justify-center items-center rounded-md px-3">Sign- in</Link>
        </div>
      </form>
      
      {message && <span className="p-3 m-4 bg-red-600 text-white rounded-md ">{message}</span>}
      </div>
      </div>
    </Form>
  )
}