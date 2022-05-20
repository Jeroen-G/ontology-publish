import React from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Button({ children, ...props }) {
    const router = useRouter();

    return (
        <Link {...props}>
            <a className={router.pathname === props.href ? 'border-b-4 border-yellow-300' : null}>
                { children }
            </a>
        </Link>
    );
}
