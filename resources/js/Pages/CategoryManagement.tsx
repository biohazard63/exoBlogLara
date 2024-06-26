import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {InertiaLink} from '@inertiajs/inertia-react';
import {PageProps} from '@/types';

import Modal from 'react-modal';
import {Inertia} from '@inertiajs/inertia';
// @ts-ignore
import {Button} from "@/Components/ui/button";


interface Category {
    id: number;
    title: string;
    description: string;
}

const CategoryManagement = (props: { auth: any, categories: Category[] }) => {
    const {auth, categories} = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [title, setTitle] = useState(''); // Change 'name' to 'title'
    const [description, setDescription] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate first and last item index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCategoryId) {
            // Update the selected category
            Inertia.put(`/category-management/${selectedCategoryId}`, {
                title: title,
                description: description,
            }, {
                onSuccess: (page) => {
                    // Refresh the page after a successful response
                    Inertia.visit(window.location.pathname);
                }
            });
        } else {
            // Create a new category
            Inertia.post('/category-management', {
                title: title,
                description: description,
            }, {
                onSuccess: (page) => {
                    // Refresh the page after a successful response
                    Inertia.visit(window.location.pathname);
                }
            });
        }
    };

    const handleEdit = (categoryId: number) => {
        // Find the category with the given ID
        const category = categories.find((category: Category) => category.id === categoryId);

        // Update the state with the category data
        setTitle(category!.title);
        setDescription(category!.description);

        // Store the selected category ID
        setSelectedCategoryId(categoryId);

        // Open the modal
        setModalIsOpen(true);
    };
    const handleDelete = (categoryId: number) => {
        // Send a DELETE request to the server
        Inertia.delete(`/category-management/${categoryId}`, {
            onSuccess: (page) => {
                // Refresh the page after a successful response
                Inertia.visit(window.location.pathname);
            }
        });
    };

    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle click on the previous page button
    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle click on the next page button
    const handleNextClick = () => {
        const totalPages = Math.ceil(categories.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <AuthenticatedLayout
            user = {auth.user}
            header = {<h2 className = "font-semibold text-xl var(--text-color) leading-tight dashboard-header" >Category Management</h2 >}
        >
    <Head title = "Category Management" />
    <div className = "ml-9 mt-4 items-center add-category-button-container" >
        <Button onClick = {() => setModalIsOpen(true)}
                className = "px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-200 add-category-button" >Add new category</Button >
        <Modal
            isOpen = {modalIsOpen}
            onRequestClose = {() => setModalIsOpen(false)}
            className = "flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50 modal-container"
            contentLabel = "Modal"
        >
            <div className = "bg-white rounded-lg w-1/2 modal-content" >
                <div className = "flex flex-col items-start p-4 modal-header" >
                    <div className = "text-gray-900 font-medium text-lg modal-title" >Add New Category</div >
                    <svg onClick = {() => setModalIsOpen(false)}
                         className = "ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer close-button"
                         xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 18 18"
                    >
                        <path
                            d = "M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4l7.7 7.6 1.3-1.3L10.4 9z" />
                    </svg >
                </div >
                <form onSubmit = {handleSubmit} className = "w-full mt-6 form-container" >
                    <label className = "block mb-2 text-sm font-bold  form-label" >
                        Name:
                        <input type = "text" value = {title} onChange = {e => setTitle(e.target.value)}
                               className = "w-full px-4 py-2 mt-2 text-sm  bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 form-input" />
                    </label >
                    <label className = "block mb-2 text-sm font-bold  form-label" >
                        Description:
                        <input type = "text" value = {description} onChange = {e => setDescription(e.target.value)}
                               className = "w-full px-4 py-2 mt-2 text-sm  bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 form-input" />
                    </label >
                    <Button type = "submit"
                            className = "w-full px-4 py-2 mt-6 font-medium text-white uppercase bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:shadow-outline form-button" >Submit</Button >
                </form >
            </div >
        </Modal >
    </div >

            {currentItems && (

                <div className = "flex justify-center items-center table-container" >
            <table className = "table-auto mx-auto category-table" >
                <thead className = "bg-gray-200" >
                    <tr >
                        <th className = "px-4 py-2 table-header" >Category Name</th >
                        <th className = "px-4 py-2 table-header" >Category Description</th >
                        <th className = "px-4 py-2 table-header" >Actions</th >
                    </tr >
                </thead >
                <tbody >
                {currentItems.map((category: Category) => (
                    <tr key = {category.id} >
                            <td className = "border px-4 py-2" >{category.title}</td >
                            <td className = "border px-4 py-2" >{category.description}</td >
                            <td className = "border px-4 py-2" >
                                <Button onClick = {() => handleEdit(category.id)}
                                        className = "mr-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700 transition duration-200" >edit</Button >

<Button onClick = {() => handleDelete(category.id)}
        className = "px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition duration-200" >delete</Button >
                            </td >
                        </tr >
                ))}
                </tbody >
                     <div className = "mt-4 flex items-center justify-between" >
    <button
        onClick = {handlePreviousClick}
        disabled = {currentPage === 1}
        className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} transition duration-200`}
    >
        Précédent
    </button >
    <div className = "text-gray-700" >
        Page {currentPage} sur {Math.ceil(categories.length / itemsPerPage)}
    </div >
    <button
        onClick = {handleNextClick}
        disabled = {currentPage === Math.ceil(categories.length / itemsPerPage)}
        className = {`px-4 py-2 rounded bg-blue-500 text-white ${currentPage === Math.ceil(categories.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} transition duration-200`}
    >
        Suivant
    </button >
</div >

            </table >
                </div >
            )}
    </AuthenticatedLayout >
    );
}

export default CategoryManagement;
