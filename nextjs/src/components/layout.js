import React from 'react';

import Head from 'next/head';

import Navigation from './navigation';

export default function Layout({ allDocuments, children }) {
    return (
        <div className="min-h-screen flex flex-col flex-nowrap">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Documentation" />
                <meta name="og:title" content="Documentation" />
                <title>Documentation</title>
            </Head>

            <header className="w-1/2 mx-auto m-10">
                <Navigation allDocuments={allDocuments} />
            </header>

            <main className="flex-1 mx-5 mt-10">
                {children}
            </main>
        </div>
    );
}
