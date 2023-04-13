import React from "react";
import Link from "next/link";



const Header = (props) => {
    return (
        <div className="w-full bg-red-950 text-white py-20 px-24">
            <h1 class="text-5xl text-center">{props.title}</h1>
            <br></br>
        </div>
    )
}
export default Header;