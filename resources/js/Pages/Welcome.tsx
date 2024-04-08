import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import React from "react";


export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {


    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout  >
        <div className = "container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-4/5 mx-auto" >
            <Head title="Welcome" />
            <h1 className = "text-4xl font-bold text-center mb-8" >Accueil - Blog de jeux vidéo</h1 >
            <div className = "bg-white shadow overflow-hidden sm:rounded-lg mb-8" >
                <div className = "px-4 py-5 sm:px-6" >
                    <h2 className = "text-lg leading-6 font-medium text-gray-900" >Article 1</h2 >
                    <p className = "mt-1 max-w-2xl text-sm text-gray-500" >Ceci est un faux article sur le dernier jeu vidéo à la mode. Il contient des informations sur le gameplay, les graphismes, l'histoire, etc.</p >
                </div >
            </div >
            <div className = "bg-white shadow overflow-hidden sm:rounded-lg mb-8" >
                <div className = "px-4 py-5 sm:px-6" >
                    <h2 className = "text-lg leading-6 font-medium text-gray-900" >Article 2</h2 >
                    <p className = "mt-1 max-w-2xl text-sm text-gray-500" >Ceci est un autre faux article sur un jeu vidéo populaire. Il contient des informations sur les personnages, les missions, les stratégies, etc.</p >
                </div >
            </div >
            <div className = "bg-white shadow overflow-hidden sm:rounded-lg" >
                <div className = "px-4 py-5 sm:px-6" >
                    <h2 className = "text-lg leading-6 font-medium text-gray-900" >Article 3</h2 >
                    <p className = "mt-1 max-w-2xl text-sm text-gray-500" >Ceci est un faux article sur un jeu vidéo à venir. Il contient des informations sur la date de sortie, les fonctionnalités attendues, les développeurs, etc.</p >
                </div >
            </div >
        </div >
    </Layout >
    );
};
