import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    function logoutAPI() {
        
        fetch('/api/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then((response) => response.json())
        .then((data) => {
            router.push('/login')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return ( 
        <nav className="flex items-center justify-between flex-wrap bg-red-900 p-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Centralized Crypto</span>
            </div>
            <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                    onClick={toggleMenu}>
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
            </div>
            <div className={`w-full block lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="text-right lg:flex-grow">
                <Link href="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Dashboard
                </Link>
                <Link href="/values" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Values
                </Link>
                <Link href="/convert" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Convert
                </Link>
                <Link href="/withdraw" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Withdraw
                </Link>
                <Link href="/transfer" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Transfer
                </Link>
                <Link href="/deposit" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                    Deposit
                </Link>
                <button onClick={logoutAPI} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-900 hover:bg-white mt-4 lg:mt-0">Logout</button>
            </div>
        
            </div>
        </nav>
    )
}
export default Navbar;