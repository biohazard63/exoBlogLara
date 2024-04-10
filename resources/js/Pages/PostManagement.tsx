import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import {Button} from "@/Components/ui/button";
import { InertiaLink } from '@inertiajs/inertia-react';
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";


interface Post {
    id: number;
    title: string;
    description: string;
}

interface PostManagementProps extends PageProps {
    posts: Post[];
}

export default function PostManagement(props: PostManagementProps) {
    const { auth, posts } = props;

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
            <Head title="Post Management" />

            <div className = " ml-9 mt-4 items-center" >
                <InertiaLink href = "/add-article" >
                    <Button >add new articles</Button >
                </InertiaLink >
            </div >

            <div className = "mt-4 mb-5 max-w-screen max-h-screen overflow-auto" >
                <div className = "mx-auto sm:px-6 lg:px-8" >
                   <table className="divide-y divide-gray-200">
    <thead className="bg-gray-50">
        <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {sortedPosts.map((post: Post) => (
            <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-normal">{post.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick = {() => handleEdit(post.id)}
                            className = "text-indigo-600 hover:text-indigo-900" >Edit</button >

                    <button onClick = {() => handleDelete(post.id)}
                            className = "ml-4 text-red-600 hover:text-red-900" >Delete</button >
                </td >
            </tr >
        ))}
    </tbody >
</table >
                </div >
            </div>
        </AuthenticatedLayout>
    );
}
