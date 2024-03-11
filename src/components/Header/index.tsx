import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='text-white flex xs:flex-col-reverse md:flex-row w-full h-fit  px-4 py-6 justify-around items-center'>
      <div className='bg-[#1B1F23] px-3 py-2 rounded-md flex flex-row gap-4 items-center'>
        <Link href={"https://www.ebay.com/"}><Image src={"/shopify-logo.png"} className='w-28 h-14' width={100} height={100} alt='Ebay'/></Link>
        <button className='bg-green-600 px-2 py-3  rounded-md'><Link href={'/admin/createinvoice'} >Create Invoice</Link></button>
        <button className='bg-green-600 px-2 py-3  rounded-md'><Link href={'/admin/investordata'} >Investor data</Link></button>
        <Link href={"https://www.shopify.com/"}><Image src={"/ebay-logo.png"} className='w-20 h-14' width={100} height={100} alt='Shopify'/></Link>
      </div>
      <div className='flex md:w-[50%] xs:w-full justify-between items-center'>
      <h2 className='xs:text-xl md:text-2xl'>ADMIN PANEL</h2>
        <button className='bg-white text-black px-3 py-2 rounded-md '><Link href={'/createAccount'} >Create Account</Link></button>
      </div>
    </div>
  )
}

export default Header