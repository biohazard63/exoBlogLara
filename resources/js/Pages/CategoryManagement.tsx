import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Button} from "@/Components/ui/button";
import { InertiaLink } from '@inertiajs/inertia-react';
import { PageProps } from '@/types';


const CategoryManagement = (props) => {
    const { auth, categories } = props;

    // Vérifiez si les catégories sont définies
    if (!categories) {
        return <div>Loading...</div>; // ou retournez un autre composant de chargement
    }

    return (
    <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category Management</h2>}
    >
        <Head title="Category Management" />
        <div className="ml-9 mt-4 items-center">
                <Button>Add new category</Button>

        </div>

        {categories && (
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Category Name</th>
                        <th className="px-4 py-2">Category Description</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td className="border px-4 py-2">{category.title}</td>
                            <td className="border px-4 py-2">{category.description}</td>
                            <td className="border px-4 py-2">
                                <Button>edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </AuthenticatedLayout>
    );
}

export default CategoryManagement;
