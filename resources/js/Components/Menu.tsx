import { Link } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from '@/Components/Dropdown';

function Menu() {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
            <Link href="/" className="mb-5">
                <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </Link>
            <div className="ms-3 relative">
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                Menu
                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href="articles">
                            Article
                        </Dropdown.Link>
                        <Dropdown.Link href="/abouts">
                            About
                        </Dropdown.Link>
                        <Dropdown.Link href="/legals">
                            Mention legals
                        </Dropdown.Link>
                        <Dropdown.Link href="/login">
                            Login
                        </Dropdown.Link>
                        <Dropdown.Link href="/register">
                            Register
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}

export default Menu;
