import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from 'axios';

export default function AddArticle({auth}: PageProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
const [categories, setCategories] = useState<{id: string, title: string}[]>([]);
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called");

        const article = {
            title: title,
            body: body,
            description: description,
            image: image,
            category_ids: selectedCategories // Envoyez les IDs de catégories sélectionnées
        };
        console.log("Article data:", article);

    try {
        console.log("Sending POST request to /add-article");
        const response = await axios.post('/add-article', article);
        console.log("Response received:", response);

        if (response.status === 201) {
            console.log("Article successfully created");
            // The article was successfully created
            // You might want to clear the form or redirect the user
            window.location.href = '/postmanagement'; // or wherever you want to redirect
        } else {
            console.log("Error creating article, status code:", response.status);
            // There was an error
        }
    } catch (error) {
        console.log("Error sending POST request:", error);
        // Handle error
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
                <label className="block">
                    <span className="text-gray-700">Image URL:</span>
                    <input type="text" value={image} onChange={e => setImage(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label>
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
