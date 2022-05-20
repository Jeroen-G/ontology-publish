import React from 'react';

import Layout from '../../components/layout';
import {findDocument, getAllDocumentPaths, getAllDocuments} from '../../lib/librarian';

export default function Doc({ allDocuments, document }) {
    return (
        <Layout allDocuments={allDocuments}>
            <article className="container mx-auto prose prose-lg">
                <h1>{document.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: document.content }} />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllDocumentPaths();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    let documentToFind = '';

    params.slug.forEach(part => {
        documentToFind = documentToFind + '/' + part;
    });

    const allDocuments = getAllDocuments(['id', 'slug', 'title']);
    const document = await findDocument(documentToFind);
    return {
        props: {
            allDocuments,
            document,
        },
    };
}
