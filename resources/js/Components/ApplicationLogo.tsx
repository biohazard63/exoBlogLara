import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img src={import.meta.env.VITE_APP_LOGO_PATH} alt="Logo" {...props} />
    );
}
