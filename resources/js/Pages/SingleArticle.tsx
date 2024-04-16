import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import {Inertia} from "@inertiajs/inertia";

interface ArticleProps {
    [key: string]: unknown;
    laravelVersion: string;
    phpVersion: string;
    article: { id: number, user:any, title: string, body: string, author:string, image: string };
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
                <p className = "mb-2" >{article.body}</p >
                <img src = {article.image} alt = {article.title} className = "w-full" />
                {auth.user && (auth.user.id === article.user.id || auth.user.role_id === 1) &&
                    <button onClick={() => Inertia.visit(`/edit-article/${article.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit Article
                    </button>}
                {article.user &&
                    <p className = "text-sm text-gray-500 mt-2" >Author: {article.user.name}</p >}
            </div >
        </Layout >
    );
};
