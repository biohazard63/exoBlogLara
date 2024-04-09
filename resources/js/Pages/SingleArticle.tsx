import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

interface ArticleProps {
    [key: string]: unknown;
    laravelVersion: string;
    phpVersion: string;
    article: { id: number, title: string, content: string, author:string, image: string };
}

export default function SingleArticle({article, auth}: PageProps<ArticleProps>) {
    if (!article) {
        return null; // or a loading spinner, or some placeholder content
    }

    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth.user}>
            <Head title = {article.title} />
            <div className = "container mx-auto px-4" >
                <h2 className = "text-xl font-bold mb-2" >{article.title}</h2 >
                <p className = "mb-2" >{article.content}</p >
                <img src = {article.image} alt = {article.title} className = "w-full" />
                {article.author &&
                    <p className = "text-sm text-gray-500 mt-2" >Author: {article.author}</p >}
            </div >
         </Layout >
    );
};
