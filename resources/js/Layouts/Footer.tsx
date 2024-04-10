import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 px-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Your Blog Name</h2>
                    <p className="mt-2">All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
                <div>
                    <a href="#" className="text-white hover:text-gray-300 mx-2">About</a>
                    <a href="#" className="text-white hover:text-gray-300 mx-2">Contact</a>
                    <a href="#" className="text-white hover:text-gray-300 mx-2">Privacy</a>
                </div>
            </div>
        </footer>
    );
};
