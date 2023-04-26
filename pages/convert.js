import Head from 'next/head';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Loading from '@/components/loading';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

function Convert() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [estimate, setEstimate] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [showEnterAccount, setShowEnterAccount] = useState(false)

  const srcAccountRef = useRef(null)

  const conversionAmountRef = useRef(null)


  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true)
      // Fetch the user's profile data
      const response = await fetch('/api/user_info')
      // If the user is not authenticated, redirect to the login page
      const stauts = await response.status
      if (stauts === 400) {
        router.push('/login')
      }

      // If the user is authenticated, set the bank data
      const d = await response.json()
      setData(d)
      if(d.bank_accounts.length === 0) {
        setShowEnterAccount(true)
      }
      setLoading(false)
    }
    fetchData()
    
  }, [])


  function submitConversion() {

    let errorMessages = [];

    /*
    if(amount === '') { errorMessages.push('Please enter an amount.') }
    if(account === '') { errorMessages.push('Please select an account.') }
    */
    let data = null
    if(showEnterAccount) {
        /* keeping these incase i need them */
      data = {amount: amount, account: account, bankName: bankName, bankAccount: bank}

    } else {
      const selected = savedBankRef.current.value
      if(selected === '') { errorMessages.push('Please select a saved account.'); }
      data = {amount: amount, account: account, savedBank: selected }
    }
    if(errorMessages.length !== 0) {
      errorMessages.forEach(message => toast.error(message));
    } else {
      submitData()
    }

    console.log(data)
    
  }
  


  function conversionEstimate() {
    const amount = document.getElementById('conversion-amount').value
    const account = document.getElementById('crypto-account').value
    const data = {amount: amount, account: account}

    const fetchData = async () => {
      // Fetch the user's profile data
      const response = await fetch('/api/conversion_estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })


      const d = await response.json()
      setEstimate(d)
    }
    if(amount !== '' && account !== '') {
      fetchData()
    } else {
      setEstimate(null)
    }
  }


  if (isLoading) return <Loading />
  if (!data) return <p>Failed to load</p>
  
  return (
    <>
      <Head>
        <title>Convert Your Tokens</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header title="Convert Tokens"/>
      <div className="bg-gray-300 sm:h-screen h-full">
        <div className="flex flex-col sm:flex-row justify-center items-stretch">
        <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-72 text-center mb-6 sm:mb-0 -mt-9">
            <h2 className="text-2xl font-bold mb-2">Token to Convert</h2>
            <div className="mb-8">
                
                {
                  !showEnterAccount ?
                  <div>
                    <button className="underline text-red-900" onClick={() => setShowEnterAccount(!showEnterAccount)}>Enter a new account</button>
                    </div>
                  :
                  <div>
                    <div className="text-left">
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="conversion-amount">
                                      Amount of Conversion
                                  </label>
                                  <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-10 mt-4 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="conversion-amount" type="number" placeholder="0.00" name="conversion-amount" />
                      </div>
                     
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-account-name">
                                      Account Name
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
                  </div>
                  
                } 
                {
                  data.bank_accounts.length > 0 &&  showEnterAccount?
                    <button className="underline text-red-900" onClick={() => setShowEnterAccount(!showEnterAccount)}>Select a saved account</button>
                  : null
                }
                
            </div>

          </div>
          <div className="flex flex-col justify-center items-center sm:pr-10 sm:pl-10 mb-6 sm:mb-0">
            <img src="/arrows.png" alt="Convert" className="mb-4 w-12 h-12" />
            <button onClick={submitConversion} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
             Convert
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-70 text-center -mt-9 flex justify-center">
            <div className="mb-4">
              <label className="block text-2xl font-bold mb-4" htmlFor="deposit-amount">
                Token to Recieve
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
            <div className="mb-4">
            </div>     
          </div>
        </div>
      </div>
    </>
  );
}

export default Convert;