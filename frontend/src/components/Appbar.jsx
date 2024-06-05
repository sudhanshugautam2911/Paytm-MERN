import { useNavigate } from "react-router-dom";
import { useState } from "react";


export const Appbar = () => {
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {firstName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstName[0]}
                    </div>
                </div>
                <button className="m-4 text-sm font-medium tracking-tighter hover:underline" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};
