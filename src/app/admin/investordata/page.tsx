"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
function Page() {
    const [investor, setInvestor] = useState([])
    const [message, setMessage] = useState("")
    const [data, setData] = useState([])
    async function getData(){
        try{
            const getInvestor = await axios.get("/api/getInvestor");
            if (getInvestor.data.success == true) {
                setInvestor(getInvestor.data.investor);
            }
            console.log(getInvestor, "got investor");
        }catch{
            
        }
    }
    async function getProducts(){
        try{
            const getInvestor = document.getElementById("selectInvestor");
            if(getInvestor.value != "none"){
                console.log(getInvestor.value)
                    const fetchInvoice = await axios.post("/api/getInvoice", {
                      userId: getInvestor.value,
                    });
                    console.log(fetchInvoice.data.success);
                    if (fetchInvoice.data.success) {
                      setData(fetchInvoice.data.investor[0].Invoices);
                    } else {
                      setMessage("Failed to Fetch");
                    }
            }else{
                setMessage("Please select a investor")
            }
        }catch{

        }
    }
    useEffect(()=>{
        getData()
        if(message){
            setTimeout(()=>{
                setMessage("")
            },2000)
        }
    },[message])
  return (
    <div className='text-white'>
        <div>
        <select
              name="selectInvestor"
              id="selectInvestor"
              className="text-black p-1 rounded-sm h-fit"
            >
              <option value="none">none</option>
              {investor &&
                investor.map((investor) => (
                    <option value={investor._id} id="" key={investor._id}>
                    {investor.email}
                  </option>
                ))}
        </select>
        <button
              className="bg-green-600 mx-1 w-fit px-2 py-2 h-fit rounded-md"
              onClick={getProducts}
            >
              Get Data
            </button>
        </div>
        {message && <span className='bg-red-600 text-white px-2 py-1 rounded-sm'>{message}</span>}
    </div>
  )
}

export default Page