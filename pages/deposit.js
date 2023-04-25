{ /* Author: Nathan Fleet */}

import Head from 'next/head';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Loading from '@/components/loading';
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

function Deposit() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [estimate, setEstimate] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [showEnterAccount, setShowEnterAccount] = useState(false)

  const savedBankRef = useRef(null)
  const bankAccountNameRef = useRef(null)
  const bankAccountNumberRef = useRef(null)
  const bankRoutingNumberRef = useRef(null)
  const rememberAccountRef = useRef(null)
  const depositAmountRef = useRef(null)
  const cryptoAccountRef = useRef(null)


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


  function submitDeposit() {

    let errorMessages = [];

    const amount = depositAmountRef.current.value
    const account = cryptoAccountRef.current.value
    if(amount === '') { errorMessages.push('Please enter an amount.') }
    if(account === '') { errorMessages.push('Please select an account.') }
    let data = null
    if(showEnterAccount) {
      const bankName = bankAccountNameRef.current.value
      const bank = bankAccountNumberRef.current.value
      const routing = bankRoutingNumberRef.current.value
      const remember = rememberAccountRef.current.checked
      
      
      if(bankName === '') { errorMessages.push('Please enter a bank account name.') }
      if(bank === '') { errorMessages.push('Please enter a bank account number.') }
      if(routing === '') { errorMessages.push('Please enter a bank routing number.') }


      data = {amount: amount, account: account, bankName: bankName, bankAccount: bank, bankRouting: routing, bankRemember: remember}

    } else {
      const selected = savedBankRef.current.value
      if(selected === '') { errorMessages.push('Please select a saved account.'); }
      data = {amount: amount, account: account, savedBank: selected }
    }

    const submitData = async () => {
      const response = await fetch('/api/deposit', { 
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)})
      const d = await response.json()
      const status = await response.status
      if(status === 200) {
        toast.success('Deposit successful!')
      } else {
        toast.error('Deposit failed. \n' + d.error)
      }
    }
    if(errorMessages.length !== 0) {
      errorMessages.forEach(message => toast.error(message));
    } else {
      submitData()
    }

    console.log(data)
    
  }


  function depositEstimate() {
    const amount = document.getElementById('deposit-amount').value
    const account = document.getElementById('crypto-account').value
    const data = {amount: amount, account: account}

    const fetchData = async () => {
      // Fetch the user's profile data
      const response = await fetch('/api/deposit_estimate', {
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
        <title>Make a Deposit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header title="Make a Deposit"/>
      <div className="bg-gray-300 sm:h-screen h-full">
        <div className="flex flex-col sm:flex-row justify-center items-stretch">
        <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center mb-6 sm:mb-0 -mt-9">
            <h2 className="text-2xl font-bold mb-2">Bank Account</h2>
            <div className="mb-8">
                
                {
                  !showEnterAccount ?
                  <div>
                    <label className="block text-lg font-bold mb-4" htmlFor="saved-accounts">
                      Select Saved Account
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white mb-4" id="saved-accounts" ref={savedBankRef}>
                    {
                      data.bank_accounts.map((account, index) => {
                        return <option key={index} value={index}>{account.account_name} ({account.account_number})</option>
                      })
                    }
                    </select> 
                    <button className="underline text-red-900" onClick={() => setShowEnterAccount(!showEnterAccount)}>Enter a new account</button>
                    </div>
                  :
                  <div>
                    <h2 className="pt-2 pb-2 text-lg font-bold">Enter Account Information</h2>
                    <div className="text-left">
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-account-number">
                                      Bank Account Number
                                  </label>
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-account-number" type="text" ref={bankAccountNumberRef}/>
                      </div>
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-routing-number">
                                      Routing Number
                                  </label>
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-routing-number" type="text" ref={bankRoutingNumberRef}/>
                      </div>
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-account-name">
                                      Account Name
                                  </label>
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-account-name" type="text" ref={bankAccountNameRef} />
                      </div>


                      <div className="flex items-center justify-center mt-4 mb-5">
                          <input className="mr-2" type="checkbox" id="remember-account" ref={rememberAccountRef}/>
                          <label htmlFor="remember-account">Remember this account</label>
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
            <img src="/arrows.png" alt="Deposit" className="mb-4 w-12 h-12" />
            <button onClick={submitDeposit} className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Deposit
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center -mt-9">
            <div className="mb-4">
              <label className="block text-2xl font-bold mb-4" htmlFor="deposit-amount">
                Deposit Amount
              </label>
              <input onChange={depositEstimate} className="shadow appearance-none border rounded w-full py-2 px-3 mb-10 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="deposit-amount" type="number" placeholder="0.00" name="deposit-amount" ref={depositAmountRef}/>
            </div>
            <div className="mb-4">
              <label className="block text-2xl font-bold mb-2" htmlFor="crypto-account">
                Crypto Account
              </label>
              <select onChange={depositEstimate} className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="crypto-account" name="crypto-account" ref={cryptoAccountRef}>
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

export default Deposit;