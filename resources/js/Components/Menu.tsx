import {Link} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from '@/Components/Dropdown';
import React from "react";

function Menu() {
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const switchToTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', switchToTheme);
    }


    return (
        <div className = "containerM flex justify-between items-center" >
            <Link href = "/" className = "mb-5" >
                <ApplicationLogo className = "w-20 h-20 fill-current" />
            </Link >
            <h1 className = "text-4xl mx-10 text-white font-bold  mb-8" >Accueil - Blog de jeux vidéo</h1 >
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
                            <Dropdown.Link href = "articles" className = "dropdown-item" >
                                Article
                            </Dropdown.Link >
                            <Dropdown.Link href = "/abouts" className = "dropdown-item text-white" >
                                About
                            </Dropdown.Link >
                            <Dropdown.Link href = "/legals" className = "dropdown-item" >
                                Mention legals
                            </Dropdown.Link >
                            <Dropdown.Link href = "/login" className = "dropdown-item" >
                                Login
                            </Dropdown.Link >
                            <Dropdown.Link href = "/register" className = "dropdown-item" >
                                Register
                            </Dropdown.Link >
                        </Dropdown.Content >
                    </Dropdown >
            </div >
        </div >
    );
}

export default Menu;
