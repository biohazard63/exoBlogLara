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
const [reloadKey, setReloadKey] = useState(0);

const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCategory(value === "" ? "all" : value);
    if (value === "") {
        setReloadKey(prevKey => prevKey + 1); // Increment reloadKey when "All categories" is selected
    }
}

useEffect(() => {
    let url = selectedCategory === "all" ? '/articles' : `/articles/category/${selectedCategory}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Add this line
            setFilteredArticles(data.posts);
        })
        .catch(error => console.log('Fetch error: ', error));
}, [selectedCategory, reloadKey]);

    return (
        <Layout user={auth.user}>
            <Head title = "Articles" />
            <div className = "container mx-auto px-4" >
                <select onChange = {handleCategoryChange} >
                    <option value = "" >All categories</option >
                    <option value = "1" >action</option >
                    <option value = "2" >rpg</option >
                    <option value = "3" >fps</option >
                </select >
                {filteredArticles ? filteredArticles.map((article) => (
                    <div key = {article.id} className = "bg-white shadow overflow-hidden sm:rounded-lg my-4" >
                        <h2 className = "px-4 py-5 sm:px-6 text-xl font-bold" >{article.title}</h2 >
                        <p className = "px-4 py-5 sm:p-6" >{article.content}</p >
                        <img src = {article.image} alt = {article.title} className = "w-100" />
                        {article.author &&
                            <p className = "px-4 py-5 sm:p-6 text-sm text-gray-500" >Author: {article.author}</p >}
                    </div >
                )) : <div className = "text-center py-4" >Loading...</div >}
            </div >
         </Layout >
    );
};
