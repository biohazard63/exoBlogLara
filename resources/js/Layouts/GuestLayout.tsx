import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import {PropsWithChildren} from 'react';
import Menu from "@/Components/Menu";
import Footer from "@/Layouts/Footer";

export default function Guest({children}: PropsWithChildren) {

    return (
       <div className="container">
    <nav className="bg-white border-b border-transparent  w-full z-10 top-0 flex justify-center items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Menu />
    </div>
</nav>

    <div
        className="w-full sm:w-full  shadow-md overflow-hidden sm:rounded-lg mx-auto">
        <div className="px-4 py-5 sm:px-6">
            {children}
        </div>
    </div>
    <div>
        <Footer/>
    </div>
</div>
);
}
