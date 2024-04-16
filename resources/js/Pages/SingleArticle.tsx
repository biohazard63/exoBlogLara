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
    <div className = "containerA mx-auto px-4 flex flex-col items-center justify-center" style={{color: 'var(--text-color)'}} >
        <h2 className = "text-xl font-bold mb-2">{article.title}</h2 >
        <p className = "mb-2">{article.body}</p >
        <img src = {article.image} alt = {article.title} className = "max-w-80 object-cover h-64" />
        {auth.user && (auth.user.id === article.user.id || auth.user.role_id === 1) &&
            <button onClick={() => Inertia.visit(`/edit-article/${article.id}`)} className="font-bold py-2 px-4 rounded" style={{backgroundColor: 'var(--primary-color)', color: 'var(--text-color)'}}>
                Edit Article
            </button>}
        {article.user &&
            <p className = "text-sm mt-2" >Author: {article.user.name}</p >}
    </div >
</Layout >
    );
};
