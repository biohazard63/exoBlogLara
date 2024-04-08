import {Link, Head} from '@inertiajs/react';
import {PageProps} from '@/types';
// @ts-ignore
import {Button} from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

interface ArticleProps {
    laravelVersion: string;
    phpVersion: string;
    articles: Array<{ id: number, title: string, content: string, author:string, image: string }> | undefined; // Allow
    // articles to be
    // undefined
}

export default function Article({auth, laravelVersion, phpVersion, articles}: PageProps<ArticleProps>) {

    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout >
            <Head title = "Articles" />
            <div className = "container mx-auto px-4" >
                {articles ? articles.map((article) => ( // Check if articles is not undefined before mapping over it
                    <div key = {article.id} className = "bg-white shadow overflow-hidden sm:rounded-lg my-4" >
                        <h2 className = "px-4 py-5 sm:px-6 text-xl font-bold" >{article.title}</h2 >
                        <p className = "px-4 py-5 sm:p-6" >{article.content}</p >
                        <img src = {article.image} alt = {article.title} className = "w-100" />
                        <p className = "px-4 py-5 sm:p-6 text-sm text-gray-500" >Author: {article.author.name}</p >
                    </div >
                )) : <div className = "text-center py-4" >Loading...</div >}
            </div >
            <Button
                className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >click me</Button >
        </Layout >
    );
};

