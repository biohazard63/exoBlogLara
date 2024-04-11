import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import {Inertia} from '@inertiajs/inertia';

interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string;
}

interface EditArticleProps extends PageProps {
    post: Post;
}

export default function EditArticle(props: EditArticleProps) {
    const {auth, post} = props;
    // Parsez le contenu du post
    const parsedContent = JSON.parse(post.content);

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [content, setContent] = useState(parsedContent.content); // Utilisez parsedContent.content comme valeur initiale
    const [image, setImage] = useState(post.image);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.put(`/edit-article/${post.id}`, {
            title: title,
            description: description,
            content: content,
            image: image,
        }, {
            onSuccess: () => {
                Inertia.visit('/postmanagement');
            }
        });
    };
    return (
        <AuthenticatedLayout
            user = {auth.user}
            header = {<h2 className = "font-semibold text-xl text-gray-800 leading-tight" >Edit Article</h2 >}
        >
            <Head title = "Edit Article" />

            <div className = "mt-4 mb-5 max-w-screen max-h-screen overflow-auto" >
                <div className = "mx-auto sm:px-6 lg:px-8" >
                    <form onSubmit = {handleSubmit} className = "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
                        <div className = "mb-4" >
                            <label className = "block text-gray-700 text-sm font-bold mb-2" htmlFor = "title" >
                                Title
                            </label >
                            <input
                                className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "title"
                                type = "text"
                                value = {title}
                                onChange = {(e) => setTitle(e.target.value)}
                            />
                        </div >

                        <div className = "mb-6" >
                            <label className = "block text-gray-700 text-sm font-bold mb-2" htmlFor = "description" >
                                Description
                            </label >
                            <textarea
                                className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id = "description"
                                value = {description}
                                onChange = {(e) => setDescription(e.target.value)}
                            />
                        </div >

                        <div className = "mb-4" >
                                    <label className = "block text-gray-700 text-sm font-bold mb-2" htmlFor = "content" >
                                        Content
                                    </label >
                                    <textarea
                                        className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id = "content"
                                        value = {content}
                                        onChange = {(e) => setContent(e.target.value)}
                                    />
                                </div >

                                <div className = "mb-4" >
                                    <label className = "block text-gray-700 text-sm font-bold mb-2" htmlFor = "image" >
                                        Image URL
                                    </label >
                                    <input
                                        className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id = "image"
                                        type = "text"
                                        value = {image}
                                        onChange = {(e) => setImage(e.target.value)}
                                    />
                                </div >

                                <div className = "flex items-center justify-between" >
                                    <button
                                        className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type = "submit" >
                                        Update Article
                                    </button >
                        </div >
                    </form >
                </div >
            </div >
        </AuthenticatedLayout >
    );
}
