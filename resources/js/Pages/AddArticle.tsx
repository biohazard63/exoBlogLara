import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios, {AxiosError} from 'axios';

export default function AddArticle({auth}: PageProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState<{id: string, title: string}[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        // Récupérez les catégories depuis votre API ici
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, []);

// Ajoutez un nouvel état pour le fichier

// Ajoutez une fonction pour gérer le changement de fichier
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
        formData.append('image', file);
    }
    formData.append('title', title);
    formData.append('body', body);
    formData.append('description', description);

    selectedCategories.forEach((categoryId, index) => {
        formData.append(`category_ids[${index}]`, categoryId);
    });

    try {
        const response = await axios.post('/add-article', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 201) {
            console.log("Article successfully created");
            window.location.href = '/postmanagement';
        } else {
            console.log("Error creating article, status code:", response.status);
        }
    } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 422) {
        const errors = axiosError.response.data as { errors: any };
        console.log(errors);
    } else {
        console.log("Error sending POST request:", axiosError);
    }
}
};

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add post</h2>}
        >
            <form onSubmit={handleSubmit}  className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Title:</span>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label>
                <label className="block">
                    <span className="text-gray-700">Content:</span>
                    <textarea value={body} onChange={e => setBody(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label>
                <label className="block">
                    <span className="text-gray-700">Description:</span>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label>
                <label className = "block" >
                    <span className = "text-gray-700" >Image:</span >
                    <input type = "file" onChange = {handleFileChange}
                           className = "mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label >
                 <label className = "block" >
                    <span className = "text-gray-700" >Categories:</span >
                    <select multiple value = {selectedCategories}
                            onChange = {e => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                            className = "mt-1 block w-full rounded-md border-gray-300 shadow-sm" >
                        {categories.map((category, index) => (
                            <option key = {index} value = {category.id} >{category.title}</option >
                        ))}
                    </select >
                </label >
                <button type = "submit" className = "mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >Add post</button >
            </form >
        </AuthenticatedLayout >
    );
}
