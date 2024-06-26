import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React, { useState } from 'react';
import axios from 'axios';

interface DashboardProps extends PageProps {
    latestPosts: any[];
    latestUsers: any[];
    latestCategories: any[];
}

export default function Dashboard({ auth, latestPosts, latestUsers, latestCategories }: DashboardProps) {

    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleLogoUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append('logo', file);
        }

        const response = await axios.post('upload_logo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            alert('Logo uploaded successfully');
        } else {
            alert('Error uploading logo');
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate dashboard-header">Dashboard</h2>}
        >
        <Head title="Dashboard" />

        <div className="py-6 dashboard-container">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 dashboard-content">
                <div className="py-4 px-5 bg-white shadow rounded-lg welcome-message">
                    <p className="text-lg leading-6 font-medium text-gray-900 welcome-text">Welcome back, {auth.user.name}!</p>
                </div>
                <div className="mt-5 py-4 px-5 bg-white shadow rounded-lg flex flex-col items-center justify-center logo-upload">
                    <div>
                        <p className="text-lg leading-6 font-medium text-gray-900 mb-4 upload-instructions">
                            modify your logo here
                        </p>
                    </div>
                    <form onSubmit={handleLogoUpload} className="mt-3 upload-form">
                        <input type="file" onChange={handleFileChange} className="border-gray-300 rounded-lg file-input" />
                        <button type="submit" className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 upload-button">Upload New Logo</button>
                    </form>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4 latest-info">
                    <div className="py-4 px-5 bg-white shadow rounded-lg latest-posts">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 info-header">Latest Posts</h3>
                        {latestPosts.map((post) => (
                            <p key={post.id} className="mt-2 text-sm text-gray-500 info-text">{post.title}</p>
                        ))}
                    </div>
                    <div className="py-4 px-5 bg-white shadow rounded-lg latest-users">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 info-header">Latest Users</h3>
                        {latestUsers.map((user) => (
                            <p key={user.id} className="mt-2 text-sm text-gray-500 info-text">{user.name}</p>
                        ))}
                    </div>
                    <div className="py-4 px-5 bg-white shadow rounded-lg latest-categories">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 info-header">Latest Categories</h3>
                        {latestCategories.map((category) => (
                            <p key={category.id} className="mt-2 text-sm text-gray-500 info-text">{category.title}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}
