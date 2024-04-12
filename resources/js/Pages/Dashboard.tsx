import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface DashboardProps extends PageProps {
    latestPosts: any[];
    latestUsers: any[];
    latestCategories: any[];
}

export default function Dashboard({ auth, latestPosts, latestUsers, latestCategories }: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-4">Latest Posts</h3>
                            {latestPosts.map((post) => (
                                <p key={post.id}>{post.title}</p>
                            ))}
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-4">Latest Users</h3>
                            {latestUsers.map((user) => (
                                <p key={user.id}>{user.name}</p>
                            ))}
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-4">Latest Categories</h3>
                            {latestCategories.map((category) => (
                                <p key={category.id}>{category.title}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
