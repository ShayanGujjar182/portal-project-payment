"use client";
import eBayApi from "ebay-api";
import React, {
  ChangeEvent,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import date from "date-and-time";

const eBay = new eBayApi({
  appId: "ShayanGu-applicat-PRD-3e9f9e983-c4aa5dc8",
  certId: "PRD-e9f9e983f4aa-4c5b-48c6-8fda-1c66",
  sandbox: false,
});
eBay.req.instance.interceptors.request.use((request) => {
  // Add Proxy
  request.url = "https://ebay.hendt.workers.dev/" + request.url;
  return request;
});
//Api calls end here
function Page() {
  const [value, setValue] = useState("");
  const [qty, setQty] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [totalamount, setTotalAmount] = useState(0);
  const [productDetail, setProductDetail] = useState({ price: "", image: "" });
  const [message, setMessage] = useState(false);
  const [investor, setInvestor] = useState([]);
  //states end here
  async function func(productId: string) {
    console.log("items reached here", productId);
    const item = await eBay.buy.browse.getItem(`v1|${productId}|0`);
    console.log(
      JSON.stringify({ price: item.price, image: item.image }, null, 2)
    );
    return { price: item.price, image: item.image };
  }

  function changeHandler(e: any) {
    setValue(e.target.value);
    console.log(value);
  }
  async function sendDetailsToInvestor() {
    // {
    //     uniqueId : {type : String},
    //     paymentStatus : { type : Boolean, default : false},
    //     totalAmount : {type : Number, default : 0},
    //     date : {type : Date},
    //     time : {type : Date},
    //     imageUrl : {type : String},
    //     productPrice : {type : String},
    //     qty : {type : Number},
    //     exchangeRate : {type : Number}
    // }
    if (exchangeRate && productDetail.image && investor && qty) {
      const getInvestor = document.getElementById("selectInvestor");
      if (getInvestor?.value) {
        const now = new Date();
        console.log(date.format(now, "YYYY-MM-DD"));
        console.log(date.format(now, "HH:mm:ss"));
        console.log(Date.now());
        const createInvoice = await axios.post("/api/createInvoice", {
          exchangeRate,
          imageUrl: productDetail.image,
          id: getInvestor?.value,
          date: date.format(now, "YYYY-MM-DD"),
          time: date.format(now, "HH:mm:ss"),
          qty: qty,
        });
        console.log(createInvoice, "response");
      }
    } else {
      console.log("information is not complete");
    }
  }
  async function handleClick() {
    const { price, image } = await func(value);
    console.log({
      price: price.value,
      image: image.imageUrl,
      message: "got from the ebay",
    });
    if (price) {
      setMessage(true);
      setProductDetail({ price: price.value, image: image.imageUrl });
      return;
    }
    setMessage(false);
  }
  async function handleExchangeRate(e : any) {
    setExchangeRate(e.target.value);
  }
  async function updatePrice() {
    try {
      const userId = Cookies.get("protalId");
      console.log(userId, "got from cookies");
      if (userId) {
        const req = await axios.post("/api/upateprice", {
          id: userId,
          exchangeRate,
        });
        console.log(req);
      }
    } catch (error) {
      console.log({ message: "Unable to update the price" });
    }
  }
  async function fetch() {
    try {
      const userId = Cookies.get("portalId");
      console.log(userId, "got from cookies");
      if (userId) {
        const getPrice = await axios.post("/api/getPrice", { id: userId });
        console.log(getPrice.data.exchangeRate, "got the price");
        if (getPrice.data.exchangeRate) {
          setExchangeRate(getPrice.data.exchangeRate);
        }
      }
      const getInvestor = await axios.get("/api/getInvestor");
      if (getInvestor.data.success == true) {
        setInvestor(getInvestor.data.investor);
      }
      console.log(getInvestor, "got investor");
    } catch (error) {
      console.log({ message: "This is the message" });
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="h-full flex bg-[#1B1F23] justify-center">
      <div className="flex h-full gap-36 ">
        <div className=" p-5 h-full">
          <div className="flex flex-row gap-16 flex-wrap">
            <div className=" flex flex-row items-end">
            <span className="flex flex-col ">
            <span className="text-white">Update Dollar Price:</span>
            <input
              type="number"
              id="exchangeRate"
              placeholder="exchangeRate"
              className="text-black p-1 rounded-sm h-fit"
              value={exchangeRate}
              onChange={handleExchangeRate}
            />
            </span>
            <button
              className="bg-green-600 mx-1 w-fit px-2 py-2 h-fit rounded-md"
              onClick={updatePrice}
            >
              Update Price
            </button>
            </div>
            {/* update price section end */}
            {/* Investor Selection */}
            <span className="flex flex-col">
            <span className="text-white">Select Investor</span>
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
                </span>
          </div>
          <div className=" ">
            <div className="flex flex-row justify-around">
            <div className="flex flex-col gap-3 p-5">
                <span className="text-white">Product Id:</span>
          <input
            type="text"
            id="productId"
            placeholder="productId"
            className="text-black p-1 rounded-sm"
            value={value}
            onChange={changeHandler}
          />
          <button
            onClick={handleClick}
            className="bg-green-600 w-fit px-2 py-2 m-1 rounded-md"
          >
            Get Product
          </button>
          
              <Image
                alt="No Image to display"
                width={400}
                height={400}
                className="w-44 text-white h-44 flex justify-center items-center"
                src={productDetail.image}
              />
              <span className="flex flex-col text-white">
                <span>
                Product Price :
                </span>
                <input
                  type="number"
                  readOnly
                  placeholder="Product Price"
                  className="p-1 rounded-sm text-black"
                  value={
                    productDetail.price ? productDetail.price + "$" : ""
                  }
                  name=""
                  id=""
                />
              </span>
              </div>
            <div className="flex flex-col  gap-3 bg-[#1B1F23] text-white p-5">
              <span>OrderId:</span>
              <input
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                }}
                id="orderid"
                placeholder="OrderId"
                className="text-black p-1 rounded-sm"
              />
              <span>QTY:</span>
              <input
                type="number"
                value={qty}
                onChange={(e) => {
                  setQty(parseInt(e.target.value));
                }}
                id="qty"
                placeholder="Quantity"
                className="text-black p-1 rounded-sm"
              />
              <span>DollarToPkr:</span>
              <input
                type="number"
                value={exchangeRate}
                readOnly
                id="dollartopkr"
                placeholder="Exchange rate"
                className="text-black p-1 rounded-sm"
              />
              <span>Total Amount (pkr):</span>
              <input
                type="number"
                id="totalamount"
                readOnly
                defaultValue={
                  exchangeRate * parseInt(productDetail.price) * qty
                }
                placeholder="Total Amount"
                className="text-black p-1 rounded-sm"
              />

            </div>
            </div>
              <button
                className="bg-white text-black  px-2 py-4 m-1 rounded-md"
                onClick={sendDetailsToInvestor}
              >
                Send Details to Investor
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
