import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import markdownToHtml from './markdownParser';

const rootDocumentsDirectory = path.join(process.cwd(), '_docs');

export function getAllDocuments(fields = []) {
    return getDocumentsInFolder(rootDocumentsDirectory, fields);
}

export function getDocumentsInFolder(folder, fields = []) {
    const itemsInDocsFolder = fs.readdirSync(folder, { withFileTypes: true });

    return itemsInDocsFolder.flatMap(item => mapDocumentsInFolder(folder, item, fields));
}

export function getAllDocumentPaths() {
    return getAllDocuments(['id', 'slug']).map(document => {
        let slug = [];

        if (document.slug !== '/') {
            document.slug.split('/').forEach(split => {
                if (split.length > 1) {
                    slug.push(split);
                }
            });
        }

        slug.push(document.id);

        return {
            params: { slug },
        };
    });
}

export async function findDocument(id) {
    const fullPath = path.join(rootDocumentsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const content = await markdownToHtml(matterResult.content);

    return {
        id,
        content,
        ...matterResult.data,
    };
}

function mapDocumentsInFolder(parentDirectory, item, fields = []) {
    const fileName = item.name;

    if (item.isDirectory()) {
        return getDocumentsInFolder(path.resolve(parentDirectory, fileName), fields);
    } else {
        return getDocument(fileName, parentDirectory, fields);
    }

}

function getDocument(fileName, parentDirectory = rootDocumentsDirectory, fields = []) {
    const fullPath = path.join(parentDirectory, fileName);
    const title = fileName.replace(/\.md$/, '');
    const id = title.replace(/ /g, '-').trim();
    const slug = parentDirectory.replace(rootDocumentsDirectory, '') + '/';
    const items = {};

    fields.forEach((field) => {
        if (field === 'id') {
            items[field] = id;
        }

        if (field === 'slug') {
            items[field] = slug;
        }

        if (field === 'title') {
            items[field] = title;
        }

        if (field === 'content') {
            items[field] = getFromMarkdown(fullPath, 'content');
        }

        if (getFromMarkdown(fullPath, field)) {
            items[field] = getFromMarkdown(fullPath, field);
        }
    });

    return items;
}

function getFromMarkdown(fullPath, field) {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (field === 'content') {
        return content;
    }

    if (data[field]) {
        return data[field];
    }

    return false;
}
