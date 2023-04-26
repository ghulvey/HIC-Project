import Head from 'next/head'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import AccountCard from '@/components/accountCard'
import Loading from '@/components/loading'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";


function Dashboard() {

  const router = useRouter()
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // Display a loading indicator
      setLoading(true)
      // Fetch the user's profile data
      const response = await fetch('/api/user_info', { method: 'POST' })

      // If the user is not authenticated, redirect to the login page
      const { status } = await response
      if (status === 400) {
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
  }, [router])

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
      <div className="bg-gray-300 dark:bg-neutral-900 pb-10">
        <Navbar />
        <Header title={welcomeTitle} />

        <div className='-mt-9'>

          <div className='flex items-center justify-center space-x-6'>
            {data.accounts.map((account, index) => {
              return <AccountCard key={index} coin={account.coin} balance={account.balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} accountNumber={account.account_number} />
            })}
          </div>
          <div className='flex items-center justify-center space-x-6 pt-6'>
            <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-100'>
              <h2 className='text-2xl text-center pb-4'>Quick Actions</h2>
              <Link href="/values" className="block mt-4 lg:inline-block lg:mt-0 bg-red-900  px-5 py-2 rounded text-white hover:bg-red-950 mr-4">
                Check Values
              </Link>
              <Link href="/convert" className="block mt-4 lg:inline-block lg:mt-0 bg-red-900  px-5 py-2 rounded text-white hover:bg-red-950 mr-4">
                Convert Coins
              </Link>
              <Link href="/withdraw" className="block mt-4 lg:inline-block lg:mt-0 bg-red-900  px-5 py-2 rounded text-white hover:bg-red-950 mr-4">
                Withdraw
              </Link>
              <Link href="/transfer" className="block mt-4 lg:inline-block lg:mt-0 bg-red-900  px-5 py-2 rounded text-white hover:bg-red-950 mr-4">
                Transfer
              </Link>
              <Link href="/deposit" className="block mt-4 lg:inline-block lg:mt-0 bg-red-900  px-5 py-2 rounded text-white hover:bg-red-950 mr-4">
                Deposit
              </Link>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-6 pt-6 mb-8'>
            <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-100'>
              <h2 className='text-2xl text-center pb-2'>Recent Transactions</h2>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Coin</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">USD</th>

                  </tr>
                </thead>
                <tbody>
                  {data.transactions.map((transaction, index) => {
                    return (
                      <tr key={index}>
                        <td className="border px-4 py-2">{transaction.description}</td>
                        <td className="border px-4 py-2">{transaction.coin}</td>
                        <td className="border px-4 py-2">{transaction.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td className="border px-4 py-2">${transaction.usd.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}



export default Dashboard
