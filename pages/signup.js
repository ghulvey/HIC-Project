import Head from 'next/head'
import { useRef } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { toast } from 'react-hot-toast';



export default function Signup() {

  const router = useRouter()
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const callAPI = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value
        })
      })
      const json = await res.json()

      if(res.status === 200) {
        if (json.result === 'Success') {
          toast.success("Account created successfully.")
          router.push('/dashboard')
        } else {
          toast.error(json.error)
        }
      } else {
        toast.error('The server is unable to process your request at this time.')
      }
    } catch (e) {
      toast.error(e)
    }
  }




  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-gray-300 dark:bg-stone-900 h-screen'>
        <div className='bg-red-900'>

          <h1 className='text-center text-white text-6xl p-14'>Centralized Crypto</h1>
          <br></br>
          <br></br>
        </div>
        <div className='flex items-center justify-center -mt-9'>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96'>
            <h1 className='text-center text-4xl pb-4'>Sign Up</h1>
            <form onSubmit={callAPI}>
            <div className='flex items-center justify-between space-x-4'>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  First Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="first-name" type="text" ref={firstNameRef} placeholder="John" name="first-name"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  Last Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="last-name" type="text" ref={lastNameRef} placeholder="Smith" name="first-name"/>
              </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" ref={usernameRef} placeholder="Username" name="username"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" ref={passwordRef} placeholder="******************" name="password" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" ref={confirmPasswordRef} placeholder="******************" name="confirm-password" />
              </div>
              <div className='mb-6 flex items-center justify-between'>
                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Sign Up
                </button>
                <Link href='/login'>
                <p className="text-center font-bold text-sm text-center text-blue-500 hover:text-blue-800">
                  Already have an account?
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
