{ /* Author: Nathan Fleet */}

import Head from 'next/head';
import Navbar from '@/components/navbar';
import Header from '@/components/header';

{/* may need to add alerts / api routes */}

function Deposit() {
  return (
    <>
      <Head>
        <title>Make a Deposit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Header title="Make a deposit"/>
      <div className="bg-gray-300 sm:h-screen h-full">
        <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center mb-6 sm:mb-0 -mt-9">
            <div className="mb-8">
                <label className="block text-lg font-bold mb-4" htmlFor="transfer-amount">
                  Saved Accounts
                </label>

                {/* Pull accounts from API? */}

                <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="currency">
                  <option value="" hidden></option>
                  <option>Account 1</option>
                </select>
                <h1 className="pt-5 text-lg font-bold">or</h1>
            </div>
            <div className="text-left">
                <div className="flex items-center mb-4">
                <label className="block text-md font-bold mr-4" htmlFor="bank-account-number">
                    Bank Account Number
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-account-number" type="text" />
                </div>
                <div className="flex items-center mb-4">
                <label className="block text-md font-bold mr-4" htmlFor="routing-number">
                    Routing Number
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="routing-number" type="text" />
                </div>
                <div className="flex items-center mb-4">
                <label className="block text-md font-bold mr-4" htmlFor="account-name">
                    Account Name
                </label>
                <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="account-name" type="text" />
                </div>
            </div>
            <div className="flex items-center justify-center mt-4 mb-5">
                <input className="mr-2" type="checkbox" id="remember-account" />
                <label htmlFor="remember-account">Remember this account</label>
            </div>
            </div>
          <div className="flex flex-col items-center sm:pr-10 sm:pl-10 mb-6 sm:mb-0">
            <img src="/arrows.png" alt="Deposit" className="mb-4 w-12 h-12" />
            <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Deposit
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center -mt-9">
            <div className="mb-20">
              <label className="block text-2xl font-bold mb-4" htmlFor="transfer-amount">
                Deposit Amount
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-10 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="deposit-amount" type="number" placeholder="0.00" />
            </div>
            <div className="mb-6">
              <label className="block text-2xl font-bold mb-2" htmlFor="currency">
                Currency
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 mb-20 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="currency">
                <option value="" hidden></option>
                <option>Maletic Money</option>
                <option>Nesty Coin</option>
                <option>Giovanni Token</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Deposit;