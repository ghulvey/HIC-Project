import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useRef, useState } from "react";

import { useRouter } from 'next/router';
import Link from 'next/link'


export default function Login() {

  const router = useRouter()

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('')

  const callAPI = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        })
      })
      const json = await res.json()

      if(res.status === 200) {
        if (json.result === 'Success') {
          router.push('/dashboard')
        } else {
          setError(json.error)
        }
      } else {
        setError('The server is unable to process your request at this time.')
      }
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-gray-300 dark:bg-stone-900 h-screen'>
        <div className='bg-red-900'>
          <br></br>
          <br></br>
          <h1 className='text-center text-white text-6xl p-14'>Centralized Crypto</h1>
          <br></br>
          <br></br>
        </div>
        <div className='flex items-center justify-center -mt-9'>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96'>
            <h1 className='text-center text-4xl pb-4'>Login</h1>
            <div className="message">{error? <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative'>{error}</div> : null}</div>
            <form onSubmit={callAPI}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" ref={usernameRef} placeholder="Username" name="username"/>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" ref={passwordRef} placeholder="******************" name="password" />
              </div>
              <div className='mb-6 flex items-center justify-between'>
                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign In
                </button>
                <Link href='/signup'>
                <p className="text-center font-bold text-sm text-center text-blue-500 hover:text-blue-800" href="#">
                  Don't have an account?
                </p>
                </Link>
              </div>
                

                

            </form>
          </div>
        </div>
        
      </div>
      
    </>
  )
}
