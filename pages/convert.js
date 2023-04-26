import Head from 'next/head';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Loading from '@/components/loading';
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

function Convert() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [estimate, setEstimate] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const srcAccountRef = useRef(null)
  const destAccountRef = useRef(null)

  const conversionAmountRef = useRef(null)


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


  function submitConversion() {

    let errorMessages = [];

    const amount = conversionAmountRef.current.value
    const srcAccount = srcAccountRef.current.value
    const destAccount = destAccountRef.current.value



    if (amount === '') { errorMessages.push('Please enter an amount.') }
    if (srcAccount === '') { errorMessages.push('Please select a source account.') }
    if (destAccount === '') { errorMessages.push('Please select a source account.') }

    let data = { amount: amount, srcAccount: srcAccount, destAccount: destAccount }

    const submitData = async () => {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const d = await response.json()
      const status = await response.status
      if (status === 200) {
        toast.success('Conversion was successful!')
      } else {
        toast.error('Conversion failed. \n' + d.error)
      }
    }

    if (errorMessages.length !== 0) {
      errorMessages.forEach(message => toast.error(message));
    } else {
      submitData()
    }

    console.log(data)

  }



  function conversionEstimate() {
    const amount = conversionAmountRef.current.value
    const srcAccount = srcAccountRef.current.value
    const destAccount = destAccountRef.current.value
    let data = { amount: amount, srcAccount: srcAccount, destAccount: destAccount }

    const fetchData = async () => {
      // Fetch the user's profile data
      const response = await fetch('/api/convert_estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })


      const d = await response.json()
      console.log(d)
      setEstimate(d)
    }
    if (amount !== '' && srcAccount !== '' && destAccount !== '') {
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
      <div className="bg-gray-300 dark:bg-neutral-900 sm:h-screen h-full">
        <Navbar />
        <Header title="Convert Tokens" />

        <div className="flex flex-col sm:flex-row justify-center items-stretch">
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center -mt-9">
            <h2 className="text-2xl font-bold mb-2">Token to Convert</h2>
            <div className="mb-8">


              <div>
                <div className="text-left">
                  <div className="flex items-center mb-4">
                    <label className="block text-md font-bold mr-4" htmlFor="conversion-amount">
                      Amount to Convert
                    </label>
                    <input onChange={conversionEstimate} className="shadow appearance-none border rounded w-full py-2 px-3 mb-10 mt-4 leading-tight focus:outline-none focus:shadow-outline" id="conversion-amount" type="number" placeholder="0.00" name="conversion-amount" ref={conversionAmountRef} />
                  </div>

                  <div className="flex items-center mb-4">
                    <label className="block text-md font-bold mr-4" htmlFor="bank-account-name">
                      Account Name
                    </label>
                    <select onChange={conversionEstimate} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="crypto-account" name="crypto-account" ref={srcAccountRef}>
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


            </div>

          </div>
          <div className="flex flex-col justify-center items-center sm:pr-10 sm:pl-10 mb-6 sm:mb-0">
            <Image src="/arrows.png" alt="Convert" width="50" height="50" className="mb-4 w-12 h-12" />
            <button onChange={conversionEstimate} onClick={submitConversion} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Convert
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center -mt-9">
            <div className="mb-4">
              <label className="block text-2xl font-bold mb-4" htmlFor="deposit-amount">
                Token to Receive
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="crypto-account" name="crypto-account" ref={destAccountRef}>
                {
                  // Map through the user's accounts and display them
                  data.accounts.map((account, index) => {
                    return <option key={index} value={account.account_number}>{account.coin} ({account.account_number})</option>
                  })
                }
              </select>
            </div>

            {
              // If estimate is not null, show the estimate
              estimate ?
                <div className="mb-6">
                  <p>Estimated: +{estimate.estimate.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                  <p>New Balance: {estimate.new_balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
                </div>
                : null
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Convert;