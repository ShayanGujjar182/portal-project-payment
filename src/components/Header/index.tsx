import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='text-white flex flex-row w-full h-fit  px-4 py-6 justify-around items-center'>
      <h2 className='text-2xl'>ADMIN PANEL</h2>
      <div className='bg-[#1B1F23] px-3 py-2 rounded-md flex flex-row gap-4 items-center'>
        <Link href={"https://www.ebay.com/"}><Image src={"/shopify-logo.png"} className='w-28 h-14' width={100} height={100} alt='Ebay'/></Link>
        <button><Link href={'/admin/createinvoice'} className='bg-green-600 px-2 py-3  rounded-md'>Create Invoice</Link></button>
        <Link href={"https://www.shopify.com/"}><Image src={"/ebay-logo.png"} className='w-20 h-14' width={100} height={100} alt='Shopify'/></Link>
      </div>
        <button><Link href={'/createAccount'} className='bg-white text-black px-3 py-2 rounded-md '>Create Account</Link></button>
    </div>
  )
}

export default Header