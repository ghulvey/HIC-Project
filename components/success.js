import React from "react";
import Link from "next/link";

const Loading = (props) => {
    return (
        <div class="flex items-center justify-center h-screen">
        <div className='bg-white text-black dark:bg-black dark:text-white rounded overflow-hidden shadow-lg p-6 w-56'>
            <h2 className='text-2xl text-center pb-2'>Processing</h2>
            <div className="flex items-center justify-center pt-3 pb-4">
            <div class="animate-spin inline-block w-16 h-16 border-[6px] border-current border-t-transparent text-red-900 rounded-full" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
            <p className="text-center">Please Wait</p>
        </div>
        </div>
    )
}
export default Loading;