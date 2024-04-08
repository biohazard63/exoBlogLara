import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
// @ts-ignore
import {Button} from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Legals({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const Layout = auth && auth.user ? AuthenticatedLayout : GuestLayout;

    return(
        <Layout>
            <Head title="Legals" />
        <div>
           Mention Legal
        </div>
    <Button>click me</Button>
</Layout>
    );
}
