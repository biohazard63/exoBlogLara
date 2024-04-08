import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import {PropsWithChildren} from 'react';
import Menu from "@/Components/Menu";
import Footer from "@/Layouts/Footer";

export default function Guest({children}: PropsWithChildren) {
    return (
        <div className = "min-h-screen bg-gray-100" >
            <nav className = "bg-white border-b border-gray-100" >
                <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <Menu />
                </div >
            </nav >

            <div
                className = "w-full sm:w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mx-auto" >
                <div className = "px-4 py-5 sm:px-6" >
                    {children}
                </div >
            </div >
            <div>
                <Footer/>
            </div>
        </div >
    );
}
