import React, {useState, useEffect} from 'react';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


interface Category {
    id: string;
    title: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    body: string;
    image: string;
    categories: Category[];
}

interface EditArticleProps extends PageProps {
    post: Post;
    error?: string; // Add this line
}

export default function EditArticle(props: EditArticleProps) {
    const {auth, post} = props;
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [body, setBody] = useState(post.body);
    const [image, setImage] = useState(post.image);
    const [categories, setCategories] = useState<{ id: string, title: string }[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


    useEffect(() => {
            axios.get('/categories')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(error => {
                    console.error("Error fetching categories:", error);
                });

            setSelectedCategories(post.categories.map(category => category.id));
        }
        , []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.put(`/edit-article/${post.id}`, {
            title: title,
            description: description,
            body: body,
            image: image,
            category_ids: selectedCategories
        }, {
            onSuccess: () => {
                Inertia.visit('/postmanagement');
            }
        });
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl var(--text-color) leading-tight dashboard-header">Edit Article</h2>}>
            <Head title="Edit Article" />
            <div className="form-wrapper flex items-center justify-center">
                <div className="mt-4 mb-5 w-1/2 h-full overflow-auto form-container"> {/* Modification ici */}
                    <div className="mx-auto sm:px-6 lg:px-8">
                        {props.error && <div className="alert alert-danger">{props.error}</div>}
                        <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 form">
                          <div className = "mb-4 form-group" >
                                <label className = "block text-sm font-bold mb-2 form-label"
                                       htmlFor = "title" >Title</label >
                                <input
                                    className = "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline form-input"
                                    id = "title" type = "text" value = {title}
                                    onChange = {(e) => setTitle(e.target.value)} />
                            </div >
                            <div className = "mb-6 form-group" >
                                <label className = "block text-sm font-bold mb-2 form-label"
                                       htmlFor = "description" >Description</label >
                                <textarea
                                    className = "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline form-input"
                                    id = "description" value = {description}
                                    onChange = {(e) => setDescription(e.target.value)} />
                            </div >
                            <div className = "mb-4 form-group" >
                                <label className = "block text-sm font-bold mb-2 form-label"
                                       htmlFor = "content" >body</label >
                                <textarea
                                    className = "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline form-input"
                                    id = "content" value = {body} onChange = {(e) => setBody(e.target.value)} />
                            </div >
                            <div className = "mb-4 form-group" >
                    <label className = "block  text-sm font-bold mb-2 form-label" htmlFor = "image" >
                        Image URL
                    </label >
                    <input
                        type = "hidden"
                        name = "current_image"
                        value = {post.image}
                    />
                    <input
                        className = "shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline form-input"
                        id = "image"
                        type = "text"
                        value = {image}
                        onChange = {(e) => setImage(e.target.value)}
                    />
                </div >


                            <div className = "mb-4 form-group" >
                                <label className = "block text-sm font-bold mb-2 form-label"
                                       htmlFor = "categories" >Categories</label >
                                <select multiple value = {selectedCategories}
                                        onChange = {e => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                                        className = "shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline form-input" >
                                    {categories.map((category, index) => (
                                        <option key = {index} value = {category.id} >{category.title}</option >
                                    ))}
                                </select >
                            </div >
                            <div className = "flex items-center justify-between" >
<button
    className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline form-button"
    type = "submit"
>
    Update Article
</button >
                            </div >
                        </form >
                    </div >
                </div >
            </div >
        </AuthenticatedLayout >
    );
}
