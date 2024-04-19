import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
// @ts-ignore
import {Button} from "@/Components/ui/button";
import { InertiaLink } from '@inertiajs/inertia-react';
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

interface User {
    name: string;
    // Add other properties as needed
}
interface Post {
    id: number;
    title: string;
    description: string;
    body: string;
    image: string;
    user: User; // Add this line
}

interface PostManagementProps extends PageProps {
    posts: Post[];
}

export default function PostManagement(props: PostManagementProps) {
    const { auth, posts } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);


    if (!posts) {
        return null; // or return a loading spinner
    }

    // Sort posts from newest to oldest
    const sortedCurrentItems = [...currentItems].sort((a, b) => b.id - a.id);

    const handleEdit = (postId: number) => {
        Inertia.visit(`/edit-article/${postId}`);
    };
    const handleDelete = async (postId: number) => {
        try {
            const response = await axios.delete(`/delete-article/${postId}`);

            if (response.status === 200) {
                console.log("Article successfully deleted");
                // Here you might want to remove the post from your state
                Inertia.reload({ only: ['posts'] });
            } else {
                console.log("Error deleting article, status code:", response.status);
            }
        } catch (error) {
            console.log("Error sending DELETE request:", error);
        }
    };
    const totalPages = Math.ceil(posts.length / itemsPerPage); // replace 'users' with 'posts'

    // Function to handle click on the previous page button
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle click on the next page button
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dashboard-header">Post Management</h2>}
    >
        <Head title="Post Management" />

        <div className="ml-9 mt-4 items-center">
            <InertiaLink href="/add-article">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add-article-button">add new articles</button>
            </InertiaLink>
        </div>

        <div className="mt-4 mb-5 max-w-screen max-h-screen overflow-auto dashboard-container">
            <div className = "mx-auto sm:px-6 lg:px-8" >
z                <table className = "divide-y divide-gray-200" >
                    <thead className = "bg-gray-50" >
                        <tr >
                            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Author</th >
                            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Title</th >
                            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >description</th >
                            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Actions</th >
                        </tr >
                    </thead >
                    <tbody className = "bg-white divide-y divide-gray-200" >
                        {sortedCurrentItems.map((post: Post) => (
                            <tr key = {post.id} >
                                <td className = "px-6 py-4 whitespace-nowrap" >{post.user.name}</td >
                                <td className = "px-6 py-4 whitespace-nowrap" >{post.title}</td >
                                <td className = "px-6 py-4 whitespace-normal" >{post.description}</td >
                                <td className = "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" >
                                    <button onClick = {() => handleEdit(post.id)}
                                            className = "px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-900 transition duration-200 edit-button" >Edit</button >

                                    <button onClick = {() => handleDelete(post.id)}
                                            className = "ml-4 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-900 transition duration-200 delete-button" >Delete</button >
                                </td >
                            </tr >
                        ))}
                    </tbody >
                </table >
                <div className = "mt-4 flex items-center justify-between" >
                    <button
                        onClick = {handlePreviousClick}
                        disabled = {currentPage === 1}
                        className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} previous-button`}
                    >
                        Précédent
                    </button >
                    <div >
                        Page {currentPage} sur {totalPages}
                    </div >
                    <button
                        onClick = {handleNextClick}
                        disabled = {currentPage === totalPages}
                        className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} next-button`}
                    >
                        Suivant
                    </button >
                </div >
            </div >
        </div >
    </AuthenticatedLayout >
    );

}
