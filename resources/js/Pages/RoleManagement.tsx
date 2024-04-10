import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from "axios";
import {Button} from "@/Components/ui/button";

interface User {
    id: number;
    name: string;
    role: string;
    email: string;
    email_verified_at: string;
}

interface Auth {
    user: User;
}

interface RoleManagementProps {
    auth: Auth;
    users: User[]; // Add users to the props
}

const RoleManagement: React.FC<RoleManagementProps> = ({ auth, users }) => {
    const [newRoles, setNewRoles] = useState<{ [key: number]: string }>({});


    const handleRoleChange = (userId: number, event: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRoles(prevRoles => ({
            ...prevRoles,
            [userId]: event.target.value,
        }));
    };

    const updateRole = async (userId: number) => {
        try {
            console.log(`Updating role for user ${userId} to ${newRoles[userId]}`); // Log the new role value
            const response = await axios.put(`/roles/${userId}`, {
                role: newRoles[userId]
            });

            if (response.status === 200) {
                console.log(`User role updated successfully.`);
            } else {
                console.log(`Failed to update user role.`);
            }
        } catch (error) {
            console.error(`An error occurred while updating the user role: ${error}`);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <div className="flex justify-center">
                <div className="p-6 max-w-xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-center">Role Management</h1>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>

                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map(user => (
                                <tr key = {user.id} >
                                    <td className = "border px-4 py-2" >{user.name}</td >
                                    <td className = "border px-4 py-2" >
                                        <select
                                            value = {newRoles[user.id] || user.role} // Use user.role as the default value
                                            onChange = {e => handleRoleChange(user.id, e)}
                                            className = "block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        >
                                            <option value = "">Select a role</option >
                                            <option value = "3" >Subscriber</option >
                                            <option value = "2" >Editor</option >
                                            <option value = "1" >Admin</option >
                                        </select >
                                    </td >
                                    <td className = "border px-4 py-2" >
                                        <Button onClick = {() => updateRole(user.id)} className = "ml-4" >Update Role</Button >
                                    </td >
                                </tr >
                            ))}
                        </tbody >
                    </table >
                </div >
            </div >
        </AuthenticatedLayout >
);
};

export default RoleManagement;
