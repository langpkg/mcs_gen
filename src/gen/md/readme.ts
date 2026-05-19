// src/gen/md/readme.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { ProjectType, ProjectMeta } from '../../common';

    import      { formatMD  } from '@langpkg/mcs_fmt';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ MAIN ════════════════════════════════════════╗

    export function generateReadme(projectType: ProjectType, meta: ProjectMeta): string {
        // const repoUrl = meta.org && meta.repoName
        //     ? `https://github.com/${meta.org}/${meta.repoName}`
        //     : '';
        // const badge = repoUrl
        //     ? `[![npm](https://img.shields.io/npm/v/${meta.name})](https://www.npmjs.com/package/${meta.name})\n\n`
        //     : '';

        const readmeContent = projectType === 'cli' ? generateCLIReadme(meta) : generateLibReadme(meta);
        const result = formatMD(readmeContent, 'README.md');

        if(result.errors?.length) {
            console.error('Error formatting readme:', JSON.stringify(result.errors, null, 2));
            throw new Error('Failed to generate readme due to formatting errors.');
        }

        return result.formatted + '\n';
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ HELP ════════════════════════════════════════╗

    function generateCLIReadme(meta: ProjectMeta): string {
        return (
            `# ${meta.name}\n\n` +
            // badge +
            `${meta.description || 'A TypeScript command-line tool.'}\n\n` +
            '## Installation\n\n```bash\n' +
            `pkg install -g ${meta.name}\n` +
            '```\n\n## Usage\n\n```bash\n' +
            `${meta.name} --help\n` +
            '```\n\n## Development\n\n```bash\npkg install\n' +
            'pkg dev       # Build in watch mode (TODO)\n' +
            'pkg lint      # Lint code\n' +
            'pkg build     # Build for production\n' +
            '```\n\n## License\n\n' +
            `${meta.license}` +
            (meta.author.name ? ` © ${new Date().getFullYear()} ${meta.author.name}` : '') +
            '\n'
        );
    }

    function generateLibReadme(meta: ProjectMeta): string {
        return (
            `# ${meta.name}\n\n` +
            // badge +
            `${meta.description || 'A TypeScript library.'}\n\n` +
            '## Installation\n\n```bash\n' +
            `pkg install ${meta.name}\n` +
            '```\n\n## Usage\n\n```typescript\n' +
            `import { example } from '${meta.name}'\n\nexample()\n` +
            '```\n\n## Development\n\n```bash\npkg install\n' +
            'pkg build     # Build distribution files\n' +
            'pkg lint      # Lint code\n' +
            'pkg test      # Run tests\n' +
            '```\n\n## License\n\n' +
            `${meta.license}` +
            (meta.author.name ? ` © ${new Date().getFullYear()} ${meta.author.name}` : '') +
            '\n'
        );
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
