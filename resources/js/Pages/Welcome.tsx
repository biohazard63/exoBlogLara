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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-4/5 mx-auto">
                <Head title="Welcome" />
                <h1 className="text-4xl font-bold text-center mb-8">Accueil - Blog de jeux vidéo</h1>
                {articles ? articles.map((article) => (
                   <Link key={article.id} href={`/articles/${article.id}`}>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                            <div className="px-4 py-5 sm:px-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">{article.title}</h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">{article.description}</p>
                                <img src={article.image} alt={article.title} className="w-full mt-4" />
                                <p className= "mt-1 max-w-2xl text-sm text-gray-500" >Author: {article.user.name}</p >
                            </div >
                        </div >
                    </Link >
                )) : 'Loading...'}
            </div>
        </Layout>
    );
};
