import React from "react";
import Link from "next/link";



const AccountCard = (props) => {
    return (
        <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-56'>
            <h2 className='text-2xl text-center pb-2'>{props.coin}</h2>
            <p className='text-4xl text-center pb-4'>{props.balance}</p>
            <p className="text-center">Account No: {props.accountNumber}</p>
        </div>
    )
}
export default AccountCard;