import React, {useState, PropsWithChildren, ReactNode} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link} from '@inertiajs/react';
import {User} from '@/types';
import Footer from '@/Layouts/Footer';

export default function Authenticated({user, header, children}: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const switchToTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', switchToTheme);
    }
    return (
        <div className = "min-h-screen bg-[var(--background-color)]" >
            <nav className = "navbar fixed w-full z-10 top-0" >
                <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className = "flex justify-between h-16" >
                        <div className = "flex" >
                            <div className = "shrink-0 flex items-center" >
                                <Link href = "/" >
                                    <ApplicationLogo className = "logo" />
                                </Link >
                            </div >
                            {user.role_id === 1 && (
                                <div className = "hidden space-x-8 sm:-my-px sm:ms-10 sm:flex" >
                                    <NavLink href = {route('dashboard')} active = {route().current('dashboard')}
                                             className = "text-[var(--text-color)]" >
                                        Dashboard
                                    </NavLink >
                                    <NavLink href = {route('postmanagement')}
                                             active = {route().current('postmanagement')}
                                             className = "text-[var(--text-color)]" >
                                        Post management
                                    </NavLink >
                                    <NavLink href = {route('role-management')}
                                             active = {route().current('role-management')}
                                             className = "text-[var(--text-color)]" >
                                        Role management
                                    </NavLink >
                                    <NavLink href = {route('category-management')}
                                             active = {route().current('category-management')}
                                             className = "text-[var(--text-color)]" >
                                        Category management
                                    </NavLink >
                                </div >
                            )}
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
                                                className = "dropdown-button"
                                            >
                                                {user ? user.name : ''}

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
                                        {[1, 2].includes(user.role_id) && (
                                            <Dropdown.Link href = {route('user-posts')}
                                                           className = "text-[var(--text-color)]" >Mes articles</Dropdown.Link >
                                        )}
                                        <Dropdown.Link href = {route('articles')}
                                                       className = "text-[var(--text-color)]" >Articles</Dropdown.Link >
                                        <Dropdown.Link href = {route('profile.edit')}
                                                       className = "text-[var(--text-color)]" >Profile</Dropdown.Link >
                                        <Dropdown.Link href = {route('abouts')}
                                                       className = "text-[var(--text-color)]" >Abouts</Dropdown.Link >
                                        <Dropdown.Link href = {route('legals')} className = "text-[var(--text-color)]" >Mention legals</Dropdown.Link >
                                        <Dropdown.Link href = {route('logout')} method = "post" as = "button"
                                                       className = "text-[var(--text-color)]" >
                                            Log Out
                                        </Dropdown.Link >
                                    </Dropdown.Content >
                                </Dropdown >
                            </div >
                        </div >

                        <div className = "-me-2 flex items-center sm:hidden" >
                            <button
                                onClick = {() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className = "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className = "h-6 w-6" stroke = "currentColor" fill = "none" viewBox = "0 0 24 24" >
                                    <path
                                        className = {!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap = "round"
                                        strokeLinejoin = "round"
                                        strokeWidth = "2"
                                        d = "M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className = {showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap = "round"
                                        strokeLinejoin = "round"
                                        strokeWidth = "2"
                                        d = "M6 18L18 6M6 6l12 12"
                                    />
                                </svg >
                            </button >
                        </div >
                    </div >
                </div >

                <div className = {(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'} >
                    <div className = "pt-2 pb-3 space-y-1" >
                        <ResponsiveNavLink href = {route('dashboard')} active = {route().current('dashboard')}
                                           className = "text-[var(--text-color)]" >
                            Dashboard
                        </ResponsiveNavLink >

                        <ResponsiveNavLink href = {route('postmanagement')} active = {route().current('postmanagement')}
                                           className = "text-[var(--text-color)]" >
                            Post management
                        </ResponsiveNavLink >
                    </div >

                    <div className = "pt-4 pb-1 border-t border-gray-200" >
                        <div className = "px-4" >
                            <div className = "font-medium text-base text-gray-800" >
                                {user ? user.name : ''}
                            </div >
                            <div className = "font-medium text-sm text-gray-500" >{user ? user.email : ''}</div >
                        </div >

                        <div className = "mt-3 space-y-1" >
                            <ResponsiveNavLink href = {route('profile.edit')}
                                               className = "text-[var(--text-color)]" >Profile</ResponsiveNavLink >
                            <ResponsiveNavLink method = "post" href = {route('logout')} as = "button"
                                               className = "text-[var(--text-color)]" >
                                Log Out
                            </ResponsiveNavLink >
                        </div >
                    </div >
                </div >
            </nav >

            {header && (
                <header className = "bg-white shadow" >
                    <div className = "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" >{header}</div >
                </header >
            )}

            <main >{children}</main >
             <div >
            <Footer />
        </div >
        </div >

    );
}
