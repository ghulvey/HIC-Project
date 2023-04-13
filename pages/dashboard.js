import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import AccountCard from '@/components/accountCard'

const inter = Inter({ subsets: ['latin'] })

function Dashboard({ data }) {
  const welcomeTitle = `Welcome back, ${data.first_name}!`
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
          <table class="table-auto ">
            <thead>
              <tr>
                <th class="border px-4 py-2">Description</th>
                <th class="border px-4 py-2">Coin</th>
                <th class="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td class="border px-4 py-2">{transaction.description}</td>
                    <td class="border px-4 py-2">{transaction.coin}</td>
                    <td class="border px-4 py-2">{transaction.amount}</td>
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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/user_info')
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export default Dashboard
