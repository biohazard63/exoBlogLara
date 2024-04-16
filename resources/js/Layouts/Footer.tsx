import React from "react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="containerF mx-auto flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold ">Your Blog Name</h2>
                    <p className="mt-2 text-">All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
                <div>
                    <a href="#" className=" hover:text-[var(--secondary-color)] mx-2">About</a>
                    <a href="#" className=" hover:text-[var(--secondary-color)] mx-2">Contact</a>
                    <a href="#" className=" hover:text-[var(--secondary-color)] mx-2">Privacy</a>
                </div>
            </div>
        </footer>
    );
};
