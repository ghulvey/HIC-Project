{ /* Author: Nathan Fleet */}

import Head from 'next/head';
import Navbar from '@/components/navbar';

{/* may need to add alerts / api routes */}

function Transfers() {
  return (
    <>
      <Head>
        <title>Make a Transfer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="bg-gray-300 sm:h-screen h-full">
        <div className="bg-red-900">
          <br></br>
          <br></br>
          <h1 className="text-center text-white text-6xl p-14">
            Make a Transfer
          </h1>
          <br></br>
          <br></br>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center -mt-9">
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center mb-6 sm:mb-0">
            <h1 className="text-center text-4xl pb-4"></h1>
            <div className="mb-8">
              <label className="block text-lg font-bold mb-4" htmlFor="transfer-amount">
                Transfer Amount
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="transfer-amount" type="number" placeholder="0.00" />
            </div>
            <br></br>
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2" htmlFor="currency">
                Currency
              </label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="currency">
                <option value="" hidden></option>
                <option>Maletic Money</option>
                <option>Nesty Coin</option>
                <option>Giovanni Token</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-center sm:pr-10 sm:pl-10 mb-6 sm:mb-0">
            <img src="/arrows.png" alt="Transfer" className="mb-4 w-12 h-12" />
            <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Transfer
            </button>
          </div>
          <div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96">
          <h1 className="text-center text-2xl font-bold pb-4">Recipient Account</h1>
            <div className="mb-8">
              <label className="block text-lg font-bold mb-2" htmlFor="transfer-amount">
                Account Number
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="account-number" type="text" placeholder="Account Number" />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2" htmlFor="currency">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="email" type="email" placeholder="Email" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transfers;