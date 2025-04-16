import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

export default function AuthLayout(){
    return (
        <>
            <Toaster position="top-right" />
            <Outlet />
        </>
    )
}