// src/gen/text/license.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectMeta } from '../../common';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ HELP ════════════════════════════════════════╗

    function buildCopyrightHolder(meta: ProjectMeta): string {
        const name      = meta.author.name  || '';
        const email     = meta.author.email || '';
        const rawGithub = typeof meta.author.github === 'string' ? meta.author.github.trim() : '';
        const github    = rawGithub
        ? rawGithub.includes('github.com')
        ? rawGithub
        : `https://github.com/${rawGithub.replace(/^@/, '')}`
        : '';
        const holder = name
        ? github
        ? `${name} (${github})`
        : email
        ? `${name} (${email})`
        : name
        : '';

        return holder;
    }

    function buildCopyright(meta: ProjectMeta): string {
        const year   = new Date().getFullYear();
        const holder = buildCopyrightHolder(meta);
        return `Copyright (c) ${year}${holder ? ' ' + holder : ''}`;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateLicense(meta: ProjectMeta): string {

        return (
            'MIT License\n\n' +
            `${buildCopyright(meta)}\n\n` +
            'Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
            'of this software and associated documentation files (the "Software"), to deal\n' +
            'in the Software without restriction, including without limitation the rights\n' +
            'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
            'copies of the Software, and to permit persons to whom the Software is\n' +
            'furnished to do so, subject to the following conditions:\n\n' +
            'The above copyright notice and this permission notice shall be included in all\n' +
            'copies or substantial portions of the Software.\n\n' +
            'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
            'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
            'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
            'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
            'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
            'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n' +
            'SOFTWARE.\n'
        );

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
