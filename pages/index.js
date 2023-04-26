import Head from 'next/head'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import Link from "next/link";


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex items-center justify-between flex-wrap bg-red-900 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/" className="font-semibold text-xl tracking-tight">Centralized Crypto</Link>
        </div>
        <div className=''>
          <Link href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0 mr-4">
            Login
          </Link>
          <Link href="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0">
            Sign Up
          </Link>
        </div>
        <Header title="Welcome to Centrailized Crypto" />
      </nav>

      <div className="bg-gray-300 dark:bg-neutral-900 sm:h-screen h-full ">
        <div className='flex space-x-10 justify-center mx-7'>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-61 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Maletic Money</h2>
            <p className='text-4sm text-justify pb-4'>Maletic Money is a stablecoin that is designed to maintain a stable value against a specific asset, such as the US dollar or gold. This makes it a popular choice for those who want to avoid the volatility of other cryptocurrencies. Maletic Money is backed by a reserve of the underlying asset, which helps to maintain its stability.</p>
          </div>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-61 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Nesty Coin</h2>
            <p className='text-4sm text-justify pb-4'>Nesty Coin is one of the digital currencies available on Centralized Crypto. It is a cryptocurrency that is designed to be used for fast and secure transactions. Nesty Coin is based on blockchain technology, which provides a secure and decentralized way to transfer funds. This means that Nesty Coin transactions cannot be altered or tampered with once they have been recorded on the blockchain.</p>
          </div>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-61 -mt-9'>
            <h2 className='text-2xl text-center pb-2'>Giovanni Token</h2>
            <p className='text-4sm text-justify pb-4'>Giovanni Token is another digital currency available on Centralized Crypto. It is a token that is used for various purposes, including payments, rewards, and access to exclusive content. Giovanni Token is based on the Ethereum blockchain, which allows for smart contracts and decentralized applications to be built on top of it.</p>
          </div>
        </div>
      </div>
    </>
  )
}
