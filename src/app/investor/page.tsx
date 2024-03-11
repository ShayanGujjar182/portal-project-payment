"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
function Page() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  async function fetch() {
    try {
      const userId = Cookies.get("portalId");
      console.log(userId, "this is user id")
      if (userId) {
        const fetchInvoice = await axios.post("/api/getInvoice", {
          userId: userId,
        });
        console.log(fetchInvoice.data.success);
        if (fetchInvoice.data.success) {
          setData(fetchInvoice.data.investor[0].Invoices);
        } else {
          setMessage("Failed to Fetch");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(typeof(data));

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="w-full flex flex-col text-white justify-center items-center">
      <span className="w-full bg-black  xs:text-2xl md:text-4xl text-center py-3">Investor Account</span>
      <div className="flex flex-col">
        {data.length != 0 ?
          data.map((newdata) => (
            <div  key={newdata._id} className="flex flex-row gap-4">
              <Image
                src={newdata.imageUrl}
                alt="product Image"
                className="w-32"
                width={200}
                height={200}
              />
              <span className="flex flex-col justify-around items-center w-32 ">
                <h1>Per Dollar Rate</h1>
                <span>{newdata.exchangeRate}</span>
              </span>
              <br />
              <span className="flex flex-col justify-around items-center w-32 ">
                <h1>Total Amount</h1>
                <span>{newdata.totalAmount}</span>
              </span>
              <br />
              <span className="flex flex-col justify-around items-center w-32 ">
                <h1>Quantity</h1>
                <span>{newdata.qty}</span>
              </span>
              <br />
              <span
                className={` flex flex-col justify-around items-center w-32  `}
              >
                <h1>Payment Status</h1>
                <span
                  className={`${
                    newdata.paymentStatus == true
                      ? "bg-green-600 text-white px-2 py-1 rounded-md"
                      : "bg-red-500 text-white px-2 py-1 rounded-md"
                  }`}
                >
                  {newdata.paymentStatus == true ? "PAID" : "UNPAID"}
                </span>
              </span>
            </div>
          )) : <span className="mt-4"> Sorry No Products to Show </span>} 
      </div>
      {message && <span>{message}</span>}
    </div>
  );
}

export default Page;
