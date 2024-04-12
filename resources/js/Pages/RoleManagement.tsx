import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from "axios";
// @ts-ignore
import {Button} from "@/Components/ui/button";
import {Pagination, PaginationContent, PaginationNext, PaginationPrevious} from '@/Components/ui/pagination';

interface User {
    id: number;
    name: string;
    role: number;
    role_id: number;
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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




    const deleteUser = async (userId: number) => {
        try {
            console.log(`Deleting user ${userId}`); // Log the user id
            const response = await axios.delete(`/roles/${userId}`);

            if (response.status === 200) {
                console.log(`User deleted successfully.`);
                // Remove the user from the users array in the state
            } else {
                console.log(`Failed to delete user.`);
            }
        } catch (error) {
            console.error(`An error occurred while deleting the user: ${(error as any).message}`);
            if ((error as any).response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error((error as any).response.data);
                console.error((error as any).response.status);
                console.error((error as any).response.headers);
            } else if ((error as any).request) {
                // The request was made but no response was received
                console.error((error as any).request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', (error as any).message);
            }
        }
    };
    const totalPages = Math.ceil(users.length / itemsPerPage);

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <div className="flex justify-center">
                <div className="p-6 mx-auto">
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
                           {currentItems.map(user => (
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
                                        <Button onClick = {() => updateRole(user.id)} className = "ml-4  mr-4" >Update Role</Button >
                                        <Button onClick = {() => deleteUser(user.id)}>Delete</Button>
                                    </td >
                                </tr >
                           ))}
                        </tbody >
                    </table >
                    <div className = "mt-4 flex items-center justify-between" >
                        <button
                            onClick = {handlePreviousClick}
                            disabled = {currentPage === 1}
                            className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            Précédent
                        </button >
                        <div >
                            Page {currentPage} sur {totalPages}
                        </div >
                        <button
                            onClick = {handleNextClick}
                            disabled = {currentPage === totalPages}
                            className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            Suivant
                        </button >
                    </div >

                </div >
            </div >
        </AuthenticatedLayout >
    );
};
export default RoleManagement;
