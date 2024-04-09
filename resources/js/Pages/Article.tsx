import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

interface ArticleProps {
    [key: string]: unknown;
    laravelVersion: string;
    phpVersion: string;
    articles: Array<{ id: number, title: string, content: string, author:string, image: string }> | undefined;
}
export default function Article({articles, auth}: PageProps<ArticleProps>) {
    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;
    const [filteredArticles, setFilteredArticles] = useState<ArticleProps['articles']>(articles);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    }

    const handleFilterClick = () => {
        if (selectedCategory === "") {
            window.location.reload();
        } else {
            let url = '/articles';
            if (selectedCategory) {
                url = `/articles/category/${selectedCategory}`;
            }
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setFilteredArticles(data.posts))
                .catch(error => console.log('Fetch error: ', error));
        }
    }

    return (
        <Layout user={auth.user}>
            <Head title = "Articles" />
            <div className = "container mx-auto px-4" >
                <select onChange={handleCategoryChange} className="border-2 border-gray-300 rounded-md p-2 my-2">
                    <option value = "" >All</option >
                    <option value = "1" >action</option >
                    <option value = "2" >rpg</option >
                    <option value = "3" >fps</option >
                </select >
                <button onClick = {handleFilterClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Filter</button >

                {filteredArticles ? filteredArticles.map((article) => (
                    <div key = {article.id} className = "bg-white shadow overflow-hidden sm:rounded-lg my-4 p-4" >
                        <h2 className = "text-xl font-bold mb-2" >{article.title}</h2 >
                        <p className = "mb-2" >{article.content}</p >
                        <img src = {article.image} alt = {article.title} className = "w-full" />
                        {article.author &&
                            <p className = "text-sm text-gray-500 mt-2" >Author: {article.author}</p >}
                    </div >
                )) : <div className = "text-center py-4" >Loading...</div >}
            </div >
         </Layout >
    );
};
