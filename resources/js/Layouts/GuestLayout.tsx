import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import React, {PropsWithChildren} from 'react';
import Menu from "@/Components/Menu";
import Footer from "@/Layouts/Footer";
import Dropdown from "@/Components/Dropdown";

export default function Guest({children}: PropsWithChildren) {

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const switchToTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', switchToTheme);
    }


    return (
        <div className = "min-h-screen bg-[var(--background-color)]" >
            <nav className = "navbar fixed w-full z-10 top-0" >
                <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className = "flex justify-end h-16" >
                        <div className = "flex" >
                            <div className = "shrink-0 flex items-center" >
                                <Link href = "/" >
                                    <ApplicationLogo className = "logo" />
                                </Link >
                            </div >
                             <div className = "hidden sm:flex sm:items-center sm:ms-6" >
                            <div
                                className = "relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" >
                                <input type = "checkbox" name = "toggle" id = "toggle"
                                       className = "toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                       onClick = {toggleTheme} />
                                <label htmlFor = "toggle"
                                       className = "toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer" ></label >
                            </div >
                            <div className = "ms-3 relative" >

                                        <Dropdown >
                        <Dropdown.Trigger >
                            <span className = "inline-flex rounded-md" >
                                <button
                                    type = "button"
                                    className = "neon-button"
                                >
                                    Menu
                                    <svg
                                        className = "ms-2 -me-0.5 h-4 w-4"
                                        xmlns = "http://www.w3.org/2000/svg"
                                        viewBox = "0 0 20 20"
                                        fill = "currentColor"
                                    >
                                        <path
                                            fillRule = "evenodd"
                                            d = "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule = "evenodd"
                                        />
                                    </svg >
                                </button >
                            </span >
                        </Dropdown.Trigger >
                        <Dropdown.Content contentClasses = "dropdown-menu" >
                            <Dropdown.Link href = "articles" className = "text-[var(--text-color)]" >
                                Article
                            </Dropdown.Link >
                            <Dropdown.Link href = "/abouts" className = "text-[var(--text-color)] " >
                                About
                            </Dropdown.Link >
                            <Dropdown.Link href = "/legals" className = "text-[var(--text-color)]" >
                                Mention legals
                            </Dropdown.Link >
                            <Dropdown.Link href = "/login" className = "text-[var(--text-color)]" >
                                Login
                            </Dropdown.Link >
                            <Dropdown.Link href = "/register" className = "text-[var(--text-color)]" >
                                Register
                            </Dropdown.Link >
                        </Dropdown.Content >
                    </Dropdown >
            </div >
        </div >
                            {/*<Menu />*/}
    </div >
    </div >
    </div >
</nav >

    <div
        className = "w-full sm:w-full  shadow-md overflow-hidden sm:rounded-lg mx-auto" >
        <div className = "px-4 py-5 sm:px-6" >
            {children}
        </div >
    </div >
    <div >
        <Footer />
    </div >
</div >
    );
}
