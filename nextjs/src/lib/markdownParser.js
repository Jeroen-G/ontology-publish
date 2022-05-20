import remark from 'remark';
import html from 'remark-html';

import RemoveMdExtension from './remark-remove-md-extension';

export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(RemoveMdExtension)
        .use(html)
        .process(markdown);

    return result.toString();
}
