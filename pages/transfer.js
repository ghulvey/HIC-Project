{ /* Author: Nathan Fleet */}

import Head from 'next/head';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Loading from '@/components/loading';
import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

{/* may need to add alerts / api routes */}

function Transfers() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [accountLookup, setAccountLookup] = useState(false)

  const srcAccountRef = useRef(null)
  const destAccountRef = useRef(null)
  const destAccountUserRef = useRef(null)
  const amountRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // Fetch the user's profile data
      const response = await fetch('/api/user_info')
      // If the user is not authenticated, redirect to the login page
      const status = await response.status
      if (status === 400) {
        router.push('/login')
      }

      // If the user is authenticated, set the bank data
      const d = await response.json()
      setData(d)
      setLoading(false)
    }
    fetchData()
  }, [])

  function submitTransfer() {

    let errorMessages = [];

    const amount = amountRef.current.value
    const srcAccount = srcAccountRef.current.value
    if(amount === '') { errorMessages.push('Please enter an amount.') }
    if(srcAccount === '') { errorMessages.push('Please select an account.') }
    let data = null
    if(accountLookup) {
      const username = destAccountUserRef.current.value
      
      if(username === '') { errorMessages.push('Please enter a username.') }

      data = {amount: amount, srcAccount: srcAccount, destUser: username }

    } else {
      const destAccount = destAccountRef.current.value
      if(destAccount === '') { errorMessages.push('Please select a destination account number.') }
      data = {amount: amount, srcAccount: srcAccount, destAccount: destAccount }
    }

    const submitData = async () => {
      const response = await fetch('/api/transfer', { 
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)})
      const d = await response.json()
      const status = await response.status
      if(status === 200) {
        toast.success('Transfer successful!')
      } else {
        toast.error(`Transfer failed. ${d.error}`)
      }
    }
    if(errorMessages.length != 0) {
      errorMessages.forEach(message => toast.error(message));
    } else {
      submitData()
    }

    console.log(data)
    
  }

  if (isLoading) return <Loading />
  if (!data) return <p>Failed to load</p>

  return (
    <>
      <Head>
        <title>Make a Transfer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header title="Make a Transfer" />
      <div className="bg-gray-300 sm:h-screen h-full">
        <div className="flex flex-col sm:flex-row items-center justify-center items-stretch">
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center mb-6 sm:mb-0 -mt-9">
            <h1 className="text-center text-4xl pb-4"></h1>
            <div className="mb-8 ">
              <label className="block text-2xl font-bold mb-2" htmlFor="transfer-amount">
                Transfer Amount
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="transfer-amount" type="number" placeholder="0.00" ref={amountRef} />
            </div>
            <br></br>
            <br></br>
            
            <div className="mb-12">
              <label className="block text-2xl font-bold mb-2" htmlFor="crypto-account">
                Crypto Account
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="crypto-account" name="crypto-account" ref={srcAccountRef}>
                  {
                    // Map through the user's accounts and display them
                      data.accounts.map((account, index) => {
                        return <option key={index} value={account.account_number}>{account.coin} ({account.account_number})</option>
                      })
                    }
              </select>
            </div>
          </div>
          <div className="flex flex-col items-center sm:pr-10 sm:pl-10 mb-6 sm:mb-0">
            <img src="/arrows.png" alt="Transfer" className="mb-4 w-12 h-12" />
            <button onClick={submitTransfer} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Transfer
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center -mt-9">
          <h1 className="text-center text-2xl font-bold pb-4">Recipient Account</h1>
            {
            // If the user is looking up an account, display the username input
            !accountLookup ? 
            <div className="mb-8">
              <label className="block text-lg font-bold mb-2" htmlFor="transfer-amount">
                Account Number
              </label>
              <input className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="account-number" type="text" placeholder="Account Number" ref={destAccountRef}/>
              <button className="underline text-red-900" onClick={() => setAccountLookup(!accountLookup)}>Lookup by username</button>
            </div>
            :
            <div className="mb-8">
              <label className="block text-lg font-bold mb-2" htmlFor="user">
                Username
              </label>
              <input className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="user" type="text" placeholder="Username" ref={destAccountUserRef} />
              <button className="underline text-red-900" onClick={() => setAccountLookup(!accountLookup)}>Lookup by account number</button>
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Transfers;