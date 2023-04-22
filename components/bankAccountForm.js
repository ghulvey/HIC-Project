import React from "react";
import Link from "next/link";



const BankAccountForm = (data, showEnterAccount) => {
    return (

<div className="bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-96 text-center mb-6 sm:mb-0 -mt-9">
            <h2 className="text-2xl font-bold mb-2">Bank Account</h2>
            <div className="mb-8">
                
                {
                  !showEnterAccount ?
                  <div>
                    <label className="block text-lg font-bold mb-4" htmlFor="saved-accounts">
                      Select Saved Account
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white mb-4" id="saved-accounts">
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
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-account-number" type="text" />
                      </div>
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-routing-number">
                                      Routing Number
                                  </label>
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-routing-number" type="text" />
                      </div>
                      <div className="flex items-center mb-4">
                          <label className="block text-md font-bold mr-4" htmlFor="bank-account-name">
                                      Account Name
                                  </label>
                          <input className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline dark:text-black bg-white" id="bank-account-name" type="text" />
                      </div>


                      <div className="flex items-center justify-center mt-4 mb-5">
                          <input className="mr-2" type="checkbox" id="remember-account" />
                          <label htmlFor="remember-account">Remember this account</label>
                      </div>
                    </div>
                  </div>
                  
                } 
                {
                  showEnterAccount?
                    <button className="underline text-red-900" onClick={() => setShowEnterAccount(!showEnterAccount)}>Select a saved account</button>
                  : null
                }
                
            </div>
            
            
            
          </div>
    )
}

export default BankAccountForm;