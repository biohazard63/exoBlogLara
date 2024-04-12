import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import React from "react";

interface ArticleProps {
    [key: string]: unknown;
    laravelVersion: string;
    phpVersion: string;
    articles: Array<{
        user: any;
        id: number, title: string, description: string, author:string, image: string }> | undefined;
}

export default ({auth, laravelVersion, phpVersion, articles}: PageProps<ArticleProps>) => {

    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth.user}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-4/5 mx-auto bg-gray-900">
                <Head title="Welcome" />
                <h1 className="text-4xl font-bold text-center mb-8 text-neon-green">Accueil - Blog de jeux vidéo</h1>
                {articles ? articles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`} className="text-neon-blue hover:text-neon-pink">
                        <div className="bg-gray-800 shadow-2xl overflow-hidden sm:rounded-lg mb-8 p-4">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 className="text-2xl leading-6 font-bold text-neon-green">{article.title}</h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-400">{article.description}</p>
                                <img src={article.image} alt={article.title} className="w-full mt-4" />
                                <p className= "mt-1 max-w-2xl text-sm text-gray-400" >Author: {article.user.name}</p >
                            </div >
                        </div >
                    </Link >
                )) : 'Loading...'}
            </div>
        </Layout>
    );
};
