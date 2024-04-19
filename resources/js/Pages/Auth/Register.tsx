import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
    <Head title="Register" />

    <form className="container form-container" onSubmit={submit}>
        <div className="form-group">
            <InputLabel htmlFor="name" value="Name" />

            <TextInput
                id="name"
                name="name"
                value={data.name}
                className="form-input mt-1 block w-full"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
                required
            />

            <InputError message={errors.name} className="input-error mt-2" />
        </div>

        <div className="form-group mt-4">
            <InputLabel htmlFor="email" value="Email" />

            <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="form-input mt-1 block w-full"
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                required
            />

            <InputError message={errors.email} className="input-error mt-2" />
        </div>

        <div className="form-group mt-4">
            <InputLabel htmlFor="password" value="Password" />

            <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="form-input mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
            />

            <InputError message={errors.password} className="input-error mt-2" />
        </div>

        <div className="form-group mt-4">
            <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

            <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="form-input mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
            />

            <InputError message={errors.password_confirmation} className="input-error mt-2" />
        </div>

        <div className="form-actions flex items-center justify-end mt-4">
            <Link
                href={route('login')}
                className="login-link underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Already registered?
            </Link>

            <PrimaryButton className="register-button ms-4" disabled={processing}>
                Register
            </PrimaryButton>
        </div>
    </form>
</GuestLayout>
    );
}
