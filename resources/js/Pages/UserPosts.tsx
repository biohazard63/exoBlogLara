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
    id: number;
    name: string;
    email: string;

}

interface Post {
    id: number;
    title: string;
    description: string;
    user: User; // Ajoutez ce champ
}

interface userPostProps extends PageProps {
    posts: Post[];
}

export default function userPosts(props: userPostProps) {
    const { auth, posts } = props;
    console.log(posts); // Move the console.log after the variable declaration

    if (!posts) {
        return null; // or return a loading spinner
    }
    // Sort posts from newest to oldest
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Post Management</h2>}
        >
            <Head title="Mes Article" />

            <div className = " ml-9 mt-4 items-center" >
                <InertiaLink href = "/add-article" >
                    <Button className = "mr-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-200">
 add new articles</Button >
                </InertiaLink >
            </div >

             <div className = "mt-4 mb-5 max-w-screen max-h-screen overflow-auto flex justify-center items-center" >
        <div className = "mx-auto sm:px-6 lg:px-8" >
            <table className = "divide-y divide-gray-200 mx-auto" >

    <thead className = "bg-gray-50" >
        <tr >
            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Author</th >
            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Title</th >
            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >description</th >
            <th className = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Actions</th >
        </tr >
    </thead >
    <tbody className = "bg-white divide-y divide-gray-200" >
        {sortedPosts.map((post: Post) => (
            <tr key = {post.id} >
        <td className = "px-6 py-4 whitespace-nowrap" >{post.user ? post.user.name : 'Unknown'}</td >
        <td className = "px-6 py-4 whitespace-nowrap" >{post.title}</td >
        <td className = "px-6 py-4 whitespace-normal" >{post.description}</td >
        <td className = "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" >
            <button onClick = {() => handleEdit(post.id)}
                    className = "mr-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-200" >edit</button >

            <button onClick = {() => handleDelete(post.id)}
                    className = "px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition duration-200" >delete</button >
        </td >
    </tr >
        ))}
    </tbody >
</table >
                </div >
            </div >
        </AuthenticatedLayout >
    );
}
