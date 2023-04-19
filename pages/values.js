import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import AccountCard from '@/components/accountCard'
import Loading from '@/components/loading'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';

export default function values() {
    return (
        <>
        <Head>
          <title>Values</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          
        </Head>
  
        <Navbar />
        <Header title="Values"/>

        <div className="bg-gray-300 sm:h-screen h-full">
    <div className='flex space-x-40 justify-center'>
        <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-56 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Maletic Money</h2>
            <p className='text-4xl text-center pb-4'>$1500</p>
        </div>
        <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-56 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Nesty Coin</h2>
            <p className='text-4xl text-center pb-4'>$1200</p>
        </div>
        <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-56 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Giovanni Token</h2>
            <p className='text-4xl text-center pb-4'>$9999</p>
        </div>
    </div>
</div>





  
       
      </>
    )
}