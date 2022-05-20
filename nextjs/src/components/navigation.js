import React from 'react';

import { Menu } from '@headlessui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Navigation({ allDocuments }) {
    const router = useRouter();

    return (
        <nav className="flex flex-wrap justify-around text-lg font-mono">
            <Link href="/">
                <a className={router.pathname === '/' ? 'border-b-4 border-yellow-300' : 'pb-1'}>
                    Home
                </a>
            </Link>

            {allDocuments && showTopLevelDocuments(allDocuments)}
            {allDocuments && showDocumentsSubMenus(allDocuments)}

            {/*<a className="w-7 pb-1" href="github" rel="noreferrer" target="_blank">*/}
            {/*    <img src="/github.svg" alt="Github" title="Github" />*/}
            {/*</a>*/}
        </nav>
    );

    function showTopLevelDocuments(documents) {
        return filterNestedDocumentsFromList(documents, false).map(item => (
            <Link key={item.id} href={`/doc/${item.id}`}>
                <a className={router.query.slug && router.query.slug[0] === item.id ? 'border-b-4 border-yellow-300 pb-1' : 'pb-1'}>
                    <span className='capitalize'>{item.title}</span>
                </a>
            </Link>
        ));
    }

    function filterNestedDocumentsFromList(list, includeNested = false) {
        return list.filter(item => {
            if (includeNested) {
                // Nested means slug has multiple sections
                return item.slug.length > 1;
            }

            return item.slug.length <= 1;
        });
    }

    function parentButtonStyles(href) {
        let styles = 'inline-flex justify-center items-center w-full pb-1 capitalize';

        if (router.query.slug && router.query.slug[0] === href.trim().split(' ')[0]) {
            styles += ' border-b-4 border-yellow-300';
        }

        return styles;
    }

    function showDocumentsSubMenus(documents) {
        const parents = [];
        const children = [];

        filterNestedDocumentsFromList(documents, true).map(item => {
            if (children[item.slug] === undefined) {
                children[item.slug] = [];
                parents.push(item.slug);
            }

            children[item.slug].push(item);
        });

        return parents.map((parent, index) => {
            const parentName = parent.replace(/\//g, ' ');

            return (
                <Menu key={index}>
                    <div className="relative inline-block text-left">
                        <Menu.Button className={parentButtonStyles(parentName)}>
                            {parentName}
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"/>
                            </svg>
                        </Menu.Button>
                        <Menu.Items
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {children[parent].map(link => (
                                <Menu.Item key={link.id}>
                                    <Link href={`/doc${link.slug}${link.id}`}>
                                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{link.title}</a>
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </div>
                </Menu>
            );
        });
    }
}
