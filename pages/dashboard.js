import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import AccountCard from '@/components/accountCard'
import Loading from '@/components/loading'
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';


function Dashboard() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // Display a loading indicator
      setLoading(true)
      // Fetch the user's profile data
      const response = await fetch('/api/user_info', {method: 'POST'})

      // If the user is not authenticated, redirect to the login page
      const stauts = await response.status
      if (stauts === 400) {
        router.push('/login')
      } else {
        // If the user is authenticated, display their profile data
        const data = await response.json()
        console.log(data)
        setData(data)
        setLoading(false)
      }
      
    }
    fetchData()
  }, [])

  if (isLoading) return <Loading />
  if (!data) return <p>Failed to load</p>


  const welcomeTitle = `Welcome back, ${data.first_name}!`
  console.log(data)
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Header title={welcomeTitle}/>
      <div  className='-mt-9'>
        <div className='flex items-center justify-center space-x-6'>
          {data.accounts.map((account, index) => {
            return <AccountCard key={index} coin={account.coin} balance={account.balance} accountNumber={account.account_number} />
          })}
        </div>
        <div className='flex items-center justify-center space-x-6 pt-6'>
          <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-100'>
          <h2 className='text-2xl text-center pb-2'>Recent Transactions</h2>
          <table className="table-auto ">
            <thead>
              <tr>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Coin</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{transaction.description}</td>
                    <td className="border px-4 py-2">{transaction.coin}</td>
                    <td className="border px-4 py-2">{transaction.amount}</td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          </div>
        </div>
      </div>

     
    </>
  )
}



export default Dashboard
