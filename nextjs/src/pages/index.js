import React from 'react';

import Layout from '../components/layout';
import {getAllDocuments} from '../lib/librarian';

export default function Home({ allDocuments }) {
    return (
        <Layout allDocuments={allDocuments}>
            <section className="container mx-auto text-gray-900">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-4">
                    Domain Documentation ✨
                </h1>

                <h2 className="text-2xl sm:leading-10 font-medium font-mono">
                    Annotate, curate, generate.
                </h2>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allDocuments = getAllDocuments(['id', 'slug', 'title']);
    return {
        props: { allDocuments },
    };
}

