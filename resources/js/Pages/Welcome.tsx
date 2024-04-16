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
        <Layout user = {auth.user} >
            <h2 className = "slogan text-center" >Welcome to the Blog!</h2 >

            <div className = "containerIndex mx-auto px-4 sm:px-6 lg:px-8 py-8 w-4/5 flex flex-wrap items-center justify-center" >
                <Head title = "Welcome" />
                {articles ? articles.map((article) => (
                    <Link key = {article.id} href = {`/articles/${article.id}`} >
                        <div className = "article-card flex flex-col items-center m-4" >
                            <div className = "article-cardChil px-4 py-5 sm:px-6" >
                                <h2 className = "article-title text-center" >{article.title}</h2 >
                                <p className = "article-description text-center" >{article.description}</p >
                                <img src = {article.image} alt = {article.title} className = "article-image max-w-80 mt-4 items-center" />
                                <p className = "article-author text-center" >Author: {article.user.name}</p >
                            </div >
                        </div >
                    </Link >
                )) : 'Loading...'}
            </div >
        </Layout >
    );
};
